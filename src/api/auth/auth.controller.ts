import { Request, Response } from 'express';

import { authService } from './auth.service';
import { asyncHandler } from 'middleware';
import { SignInDto, SignUpDto } from './auth.dtos';
import { TResponse } from 'types';

import UserMapper from 'api/user/user.mapper';

class AuthController {
  signUp = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, gender, email, mobile, password } = req.body;
    const signUpDto: SignUpDto = { firstName, lastName, gender, email, mobile, password };

    /** Enable email activation code once it is required */

    // const { emailSuccessStatus, user } = await authService.signUp(signUpDto);

    // const mappedUser = new UserMapper(user);

    // const statusCode = emailSuccessStatus ? 201 : 400;

    // const response: TResponse = {
    //   success: emailSuccessStatus,
    //   message: emailSuccessStatus
    //     ? strings.ACTIVATION_EMAIL_SENT_SUCCESS(email)
    //     : strings.ACTIVATION_EMAIL_SENT_ERROR(email),
    // };

    // if (emailSuccessStatus) response.data = mappedUser;

    const { token, user } = await authService.signUp(signUpDto);

    const mappedUser = new UserMapper(user);

    const response: TResponse = {
      data: {
        currentUser: mappedUser,
        token,
      },
      success: true,
    };

    res.status(201).json(response);
  });

  signIn = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req?.body;
    const payload: SignInDto = { email, password };

    const { token, user } = await authService.signIn(payload);
    const mappedUser = new UserMapper(user);

    const response: TResponse = {
      data: {
        currentUser: mappedUser,
        token,
      },
      success: true,
    };

    res.status(201).json(response);
  });
}

export const authController = new AuthController();
