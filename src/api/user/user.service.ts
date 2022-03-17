import { IUserDocument } from './user.model';
import { userRepository } from './user.repository';
import strings from './user.strings';

import { S3Folders, UserStatuses } from 'enums';
import EmailHandler from 'library/email.library';
import Storage from 'library/storage.library';
import { TokenManager } from 'library/token-manager.library';
import { PasswordManager } from 'library/password-manager.library';
import ErrorResponse from 'library/error-response';
import { ResetEmailPayload, ResetPasswordPayload, UpdateUserRolePayload } from 'types';

class UserService implements IUserService {
  async getProfile(userId: string): Promise<IUserDocument> {
    const user = await userRepository.getUserById(userId);

    if (!user) throw new ErrorResponse(strings.USER_NOT_FOUND, 404);
    if (user?.status === UserStatuses.Closed) throw new ErrorResponse(strings.ACCOUNT_CLOSED, 404);

    return user;
  }

  async updateProfile(user: IUserDocument): Promise<IUserDocument> {
    const updatedUser = await userRepository.save(user);

    return updatedUser;
  }

  async activateAccount(token: string): Promise<string> {
    const { email } = TokenManager.verifyToken(token, process.env.JWT_ACTIVATION_TOKEN_SECRET);
    const user: IUserDocument | null = await userRepository.getUserByEmail(email);

    if (!user) throw new ErrorResponse(strings.USER_NOT_FOUND, 404);

    await userRepository.activateAccount(email);

    return strings.USER_ACTIVATED;
  }

  async deleteUser(userId: string): Promise<string> {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new ErrorResponse(strings.USER_NOT_FOUND, 404);

    await userRepository.deleteUser(userId);

    return strings.USER_DELETED;
  }

  async getUserById(userId: string): Promise<IUserDocument> {
    const user: IUserDocument | null = await userRepository.getUserById(userId);
    if (!user) throw new ErrorResponse(strings.USER_NOT_FOUND, 404);

    return user;
  }

  async getUserByEmail(email: string): Promise<IUserDocument> {
    const user: IUserDocument | null = await userRepository.getUserByEmail(email);
    if (!user) throw new ErrorResponse(strings.USER_NOT_FOUND, 404);

    return user;
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new ErrorResponse(strings.USER_NOT_FOUND, 404);

    const payload = { userId: user?.id };
    const jwtSecret = process.env.JWT_RESET_TOKEN_SECRET;
    const options = { expiresIn: process.env.JWT_RESET_TOKEN_TTL };

    const token = TokenManager.generateToken(payload, jwtSecret, options);

    await userRepository.setResetPasswordToken(token, email);

    const emailPayload: ResetEmailPayload = { email, token };
    const emailSuccessStatus = EmailHandler.sendResetPasswordEmail(emailPayload);
    return emailSuccessStatus;
  }

  async resetPassword(resetData: ResetPasswordPayload): Promise<IUserDocument> {
    const { resetToken, password } = resetData;

    if (!resetToken) throw new ErrorResponse('No reset token found', 400);

    const user = await userRepository.getUserByResetToken(resetToken);
    if (!user) throw new ErrorResponse(strings.INVALID_RESET_TOKEN, 400);

    user.password = await PasswordManager.toHash(password);
    user.resetPasswordToken = '';

    const updatedUser = await userRepository.save(user);
    return updatedUser;
  }

  async updateUserRole(data: UpdateUserRolePayload): Promise<IUserDocument> {
    const { userId, role } = data;

    const user = await userRepository.getUserById(userId);
    if (!user) throw new ErrorResponse(strings.USER_NOT_FOUND, 400);

    user.role = role;

    const updatedUser = await userRepository.save(user);
    return updatedUser;
  }

  async uploadUserPhoto(id: string, photo: string): Promise<IUserDocument> {
    const user = await userRepository.getUserById(id);

    if (!user) throw new ErrorResponse(strings.USER_NOT_FOUND, 400);

    const { success, data } = await Storage.uploadImage(S3Folders.Users, photo);

    if (!success) throw new ErrorResponse(strings.PHOTO_UPLOAD_FAILED, 400);

    user.photo = data;

    const updatedUser = await userRepository.save(user);
    return updatedUser;
  }
}

export const userService = new UserService();

interface IUserService {
  getProfile(userId: string): Promise<IUserDocument>;
  updateProfile(userData: IUserDocument): Promise<IUserDocument>;
  activateAccount(userId: string): Promise<string>;
  deleteUser(userId: string): Promise<string>;
  getUserById(userId: string): Promise<IUserDocument>;
  forgotPassword(email: string): Promise<boolean>;
  resetPassword(resetData: ResetPasswordPayload): Promise<IUserDocument>;
  updateUserRole(data: UpdateUserRolePayload): Promise<IUserDocument>;
  uploadUserPhoto(id: string, photo: string): Promise<IUserDocument>;
}
