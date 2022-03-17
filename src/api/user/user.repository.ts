import { Model } from 'mongoose';

import { IUserDocument } from './user.model';
import { UserModel } from './user.schema';

import { UserStatuses } from 'enums';

class UserRepository implements IUserRepository {
  private userModel: Model<IUserDocument>;

  constructor(model: Model<IUserDocument>) {
    this.userModel = model;
  }

  async save(user: IUserDocument): Promise<IUserDocument> {
    try {
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<IUserDocument | null> {
    try {
      return await this.userModel.findOne({ email }).select('+password');
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string): Promise<IUserDocument | null> {
    try {
      const user = await this.userModel.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async activateAccount(email: string): Promise<IUserDocument | null> {
    try {
      const dataToUpdate = { status: UserStatuses.Active };
      const options = { new: true };

      const updatedUser = await this.userModel.findOneAndUpdate({ email }, dataToUpdate, options);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const dataToUpdate = { status: UserStatuses.Deleted };
      const options = { new: true };

      await this.userModel.findByIdAndUpdate(userId, dataToUpdate, options);
    } catch (error) {
      throw error;
    }
  }

  async setResetPasswordToken(resetPasswordToken: string, email: string): Promise<void> {
    try {
      await this.userModel.findOneAndUpdate({ email }, { $set: { resetPasswordToken } }, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async getUserByResetToken(resetPasswordToken: string): Promise<IUserDocument | null> {
    const user = this.userModel.findOne({ resetPasswordToken });
    return user;
  }
}

export const userRepository = new UserRepository(UserModel);

export interface IUserRepository {
  save(user: IUserDocument): Promise<IUserDocument>;
  getUserByEmail(id: string): Promise<IUserDocument | null>;
  getUserById(userId: string): Promise<IUserDocument | null>;
  activateAccount(userId: string): Promise<IUserDocument | null>;
  deleteUser(userId: string): Promise<void>;
  setResetPasswordToken(resetPasswordToken: string, email: string): Promise<void>;
  getUserByResetToken(resetPasswordToken: string): Promise<IUserDocument | null>;
}
