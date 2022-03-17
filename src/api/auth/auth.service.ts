import { IUser } from 'api/user/user.model';
import { UserModel } from 'api/user/user.schema';
import { authRepository } from './auth.repository';
import { userRepository } from 'api/user/user.repository';
import { UserStatuses } from 'enums';
// import { ActivationEmailPayload } from 'types';

// import EmailHandler from 'library/email.library';
import { PasswordManager } from 'library/password-manager.library';
import { TokenManager } from 'library/token-manager.library';
import { SignInDto, SignUpDto } from './auth.dtos';

import ErrorResponse from 'library/error-response';

import strings from './auth.strings';

class AuthService implements IAuthService {
  async signUp(signUpDto: SignUpDto): Promise<{ token: string; user: IUser }> {
    const user = await userRepository.getUserByEmail(signUpDto?.email);

    if (user) throw new ErrorResponse(strings.EMAIL_ALREADY_EXISTS, 400);

    const userToSave = new UserModel(signUpDto);
    const { firstName, email, password } = userToSave;
    userToSave.password = await PasswordManager.toHash(userToSave.password);

    const savedUser = await authRepository.create(userToSave);

    const tokenPayload = { firstName, email, password };
    const jwtSecret = process.env.JWT_ACTIVATION_TOKEN_SECRET;
    const options = { expiresIn: process.env.JWT_ACTIVATION_TOKEN_TTL };

    const token = TokenManager.generateToken(tokenPayload, jwtSecret, options);

    /** Enable email activation code once it is required */

    // const emailPayload: ActivationEmailPayload = { email, firstName, token };
    // const emailSuccessStatus = await EmailHandler.sendActivationEmail(emailPayload);
    // return { emailSuccessStatus, user: savedUser };

    return { token, user: savedUser };
  }

  async signIn({ email, password }: SignInDto): Promise<{ token: string; user: IUser }> {
    const user = await userRepository.getUserByEmail(email);

    if (!user) throw new ErrorResponse(strings.INVALID_CREDENTIALS, 401);

    const passwordMatched = await PasswordManager.compare(password, user.password);
    if (!passwordMatched) throw new ErrorResponse(strings.INVALID_CREDENTIALS, 401);

    if (user?.status === UserStatuses.Pending) throw new ErrorResponse(strings.ACCOUNT_PENDING, 400);

    if (user?.status === UserStatuses.Closed) await userRepository.activateAccount(user?.id);

    const tokenPayload = { userId: user?.id };
    const jwtSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const options = { expiresIn: process.env.JWT_ACCESS_TOKEN_TTL };

    const token = TokenManager.generateToken(tokenPayload, jwtSecret, options);

    return { token, user };
  }
}

export const authService = new AuthService();

interface IAuthService {
  // signUp(signUpDto: SignUpDto): Promise<{ emailSuccessStatus: boolean; user: IUser }>;
  signUp(signUpDto: SignUpDto): Promise<{ token: string; user: IUser }>;
  signIn(signInDto: SignInDto): Promise<{ token: string; user: IUser }>;
}
