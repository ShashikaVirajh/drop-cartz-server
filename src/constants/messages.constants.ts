// /* eslint-disable no-multi-spaces */

export const messages = {
  /** SERVER */
  SERVER_STARED: (env: string, port: string | number): string => `[SERVER]:    Mode: ${env} | Port: ${port}`,
  DATABASE_CONNECTED: (connection: string): string => `[DATABASE]:  MongoDB Connected: ${connection}`,
  DATABASE_ERROR: (error: string): string => `[ERROR]:     MongoDB Connection Error: ${error}`,

  /** SEEDER */
  DATA_SEED_SUCCESS: '[SEEDER]: Data seeded successfully',
  DATA_SEED_ERROR: '[SEEDER]: Error occured while seeding data',
  DATA_DESTROY_SUCCESS: '[SEEDER]: Data destroyed successfully',
  DATA_DESTROY_ERROR: '[SEEDER]: Error occured while destroying data',
  SEED_COMMAND_ERROR: '[SEEDER]: Invalid argument. Use seed or delete as the argument.',

  /** AUTH */
  ACCOUNT_PENDING: 'Please activate your account from your email.',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  INVALID_CREDENTIALS: 'Email or password is incorrect',
  USER_NOT_AUTHORIZED: 'User not authorized',
  INVALID_TOKEN: 'Invalid token',
  INVALID_RESET_TOKEN: 'Invalid reset password token',
  NO_TOKEN_PROVIDED: 'Access denied. No token provided.',
  INCORRECT_PASSWORD: 'Password is incorrect',
  ACCOUNT_CLOSED: 'Your account was closed. You can log in any time to activate the account.',

  /** PROFILE */
  PROFILE_CREATED: 'Profile created',
  PROFILE_UPDATED: 'Profile updated',
  PROFILE_HANDLE_EXISTS: 'Profile handle already exists',
  PROFILE_NOT_FOUND: 'Profile not found',
  USER_NOT_FOUND: 'User not found',
  NO_USER_FOR_EMAIL: 'No user found for this email',

  /** REVIEW */
  REVIEW_ADDED: 'Review added',
  REVIEW_UPDATED: 'Review updated',
  REVIEW_DELETED: 'Review deleted',
  REVIEW_NOT_FOUND: 'Review not found',

  /** COMMON */
  EMAIL_SENT: 'An email was sent to your account. Please check',
  EMAIL_NOT_SENT: 'Email could not be sent',

  SERVER_ERROR: 'Server Error',
  RESOURCE_NOT_FOUND: 'No resource found for this id',
  DUPLICATE_FIELD_VALUE: 'Duplicate field value entered',
};
