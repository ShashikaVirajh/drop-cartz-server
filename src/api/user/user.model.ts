import { Document } from 'mongoose';

import { Genders, UserRoles, UserStatuses } from 'enums';

export interface IUser {
  firstName: string;
  lastName: string;
  gender: Genders;
  email: string;
  mobile: string;
  password: string;
  photo?: any;
  role?: UserRoles;
  status?: UserStatuses;
  resetPasswordToken?: string;
}

export interface IUserDocument extends IUser, Document {}
