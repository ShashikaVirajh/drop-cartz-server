import { UserRoles } from 'enums';

export type TResponse = {
  success: boolean;
  data?: any;
  message?: string;
  token?: string;
  paginate?: Paginate;
  count?: number;
};

export type IDecodedJWT = {
  id: string;
  iat: number;
  exp: number;
};

export type JWTSignInIOptions = {
  expiresIn: string;
};

export type ActivationEmailPayload = {
  email: string;
  firstName: string;
  token: string;
};

export type ResetEmailPayload = {
  email: string;
  token: string;
};

export type ResetPasswordPayload = {
  password: string;
  resetToken: string;
};

export type UpdateUserRolePayload = {
  userId: string;
  role: UserRoles;
};

export type UploadUserPhotoPayload = {
  id: string;
  photo: string;
};

export type Error = {
  message: string;
};

export type PageLimit = {
  page: number;
  limit: number;
};

export type Paginate = {
  prev?: { page: number; limit: number };
  next?: { page: number; limit: number };
};

export type PaginatedResult = {
  paginate: Paginate;
  count: number;
  data: any;
};
