import { Model } from 'mongoose';

import { IUser, IUserDocument } from 'api/user/user.model';
import { UserModel } from 'api/user/user.schema';
import { SignUpDto } from './auth.dtos';

class AuthRepository implements IAuthRepository {
  constructor(private userModel: Model<IUserDocument>) {}

  async create(signUpDto: SignUpDto): Promise<IUser> {
    try {
      const user = new this.userModel(signUpDto);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }
}

export const authRepository = new AuthRepository(UserModel);

export interface IAuthRepository {
  create(signUpDto: SignUpDto): Promise<IUser>;
}
