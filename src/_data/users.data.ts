/* eslint-disable max-len */
import bcrypt from 'bcryptjs';

import { IUser } from 'api/user/user.model';
import { Genders, UserRoles, UserStatuses } from 'enums';

const users: IUser[] = [
  {
    firstName: 'Shashika',
    lastName: 'Virajh',
    gender: Genders.Male,
    email: 'shashikasvka@gmail.com',
    mobile: '0713980787',
    password: bcrypt.hashSync('123123123', 10),
    role: UserRoles.Admin,
    status: UserStatuses.Active,
    photo: {
      key: 'users/501af77e-2128-455e-b114-01e2eb2dbc59.jpeg',
      url: 'https://dropcartz.s3.amazonaws.com/users/501af77e-2128-455e-b114-01e2eb2dbc59.jpeg',
    },
  },
  {
    firstName: 'Nimeshika',
    lastName: 'Maduwanthi',
    gender: Genders.Female,
    email: 'nimeshikanmp@gmail.com',
    mobile: '070168780',
    password: bcrypt.hashSync('123123123', 10),
    role: UserRoles.User,
    status: UserStatuses.Active,
    photo: {
      key: 'users/44135021-e716-42d6-8b75-17c04ed401f7.jpeg',
      url: 'https://dropcartz.s3.amazonaws.com/users/44135021-e716-42d6-8b75-17c04ed401f7.jpeg',
    },
  },
  {
    firstName: 'Sherlock',
    lastName: 'Holmes',
    gender: Genders.Male,
    email: 'sherlock@gmail.com',
    mobile: '0123456789',
    password: bcrypt.hashSync('123123123', 10),
    role: UserRoles.User,
    status: UserStatuses.Active,
    photo: {
      key: 'users/9555c54c-e2da-4c07-b683-842b233f797e.jpeg',
      url: 'https://dropcartz.s3.amazonaws.com/users/9555c54c-e2da-4c07-b683-842b233f797e.jpeg',
    },
  },
];

export default users;
