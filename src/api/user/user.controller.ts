import { Request, Response } from 'express';

import { userService } from './user.service';
import strings from './user.strings';
import UserMapper from './user.mapper';

import { asyncHandler } from 'middleware';
import { TResponse } from 'types';

class UserController {
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const authUser = await userService.getProfile(req?.authUser?.id);
    const mappedUser = new UserMapper(authUser);

    const response: TResponse = {
      success: true,
      data: mappedUser,
    };

    res.status(200).json(response);
  });

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;

    const user = await userService.getUserById(req?.authUser?.id);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
    }

    const updatedUser = await userService.updateProfile(user);
    const mappedUser = new UserMapper(updatedUser);

    const response: TResponse = {
      success: true,
      data: mappedUser,
    };

    res.status(200).json(response);
  });

  getUsers = asyncHandler(async (req: Request, res: Response) => {
    const response: TResponse = {
      success: true,
      ...res.paginatedResult,
    };

    res.status(200).json(response);
  });

  activateAccount = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req?.body;
    const message = await userService.activateAccount(token);

    const response: TResponse = {
      success: true,
      message,
    };

    res.status(200).json(response);
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req?.params;
    const message = await userService.deleteUser(id);

    const response: TResponse = {
      success: true,
      message,
    };

    res.status(200).json(response);
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req?.params;

    const user = await userService.getUserById(id);
    const mappedUser = new UserMapper(user);

    const response: TResponse = {
      success: true,
      data: mappedUser,
    };

    res.status(200).json(response);
  });

  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req?.body;

    const emailSuccessStatus = await userService.forgotPassword(email);

    const response: TResponse = {
      success: emailSuccessStatus,
      message: emailSuccessStatus ? strings.RESET_EMAIL_SUCCESS(email) : strings.RESET_EMAIL_ERROR(email),
    };

    const statusCode = emailSuccessStatus ? 201 : 400;
    res.status(statusCode).json(response);
  });

  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { resetToken, password } = req?.body;
    const data = { resetToken, password };

    const user = await userService.resetPassword(data);
    const mappedUser = new UserMapper(user);

    const response: TResponse = {
      success: true,
      message: strings.PASSWORD_RESET_SUCCESSFUL,
      data: mappedUser,
    };

    res.status(200).json(response);
  });

  updateUserRole = asyncHandler(async (req: Request, res: Response) => {
    const { userId, role } = req?.body;
    const data = { userId, role };

    const user = await userService.updateUserRole(data);
    const mappedUser = new UserMapper(user);

    const response: TResponse = {
      success: true,
      message: strings.USER_ROLE_UPDATED(role),
      data: mappedUser,
    };

    res.status(200).json(response);
  });

  uploadUserPhoto = asyncHandler(async (req: Request, res: Response) => {
    const { photo } = req?.body;
    const { id } = req?.authUser;

    const user = await userService.uploadUserPhoto(id, photo);
    const mappedUser = new UserMapper(user);

    const response: TResponse = {
      success: true,
      message: strings.USER_PHOTO_UPDATED,
      data: mappedUser,
    };

    res.status(200).json(response);
  });
}

export const userController = new UserController();
