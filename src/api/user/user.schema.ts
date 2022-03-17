import { model, Schema } from 'mongoose';

import { Genders, ModelNames, UserRoles, UserStatuses } from 'enums';
import { IUserDocument } from './user.model';

const userSchema = new Schema(
  {
    firstName: { type: String, minlength: 1, maxlength: 20, trim: true, required: true },
    lastName: { type: String, minlength: 1, maxlength: 20, trim: true, required: true },
    gender: { type: String, enum: Genders, default: Genders.Male, required: true },
    email: { type: String, minlength: 5, maxlength: 50, trim: true, unique: true, required: true },
    mobile: { type: String, minlength: 5, maxlength: 50, trim: true, unique: true, required: true },
    password: { type: String, maxlength: 255, select: false, required: true },
    photo: { key: String, url: String },
    role: { type: String, enum: UserRoles, default: UserRoles.User, required: true },
    status: { type: String, enum: UserStatuses, default: UserStatuses.Active, required: true },
    resetPasswordToken: { type: String },
  },
  { timestamps: true },
);

export const UserModel = model<IUserDocument>(ModelNames.USER, userSchema);
