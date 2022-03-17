export default {
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Email or password is incorrect',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  ACCOUNT_PENDING: 'Please activate your account from your email.',
  ACCOUNT_CLOSED: 'Your account was closed. You can log in any time to activate the account.',
  INVALID_RESET_TOKEN: 'Invalid reset token',
  ACTIVATION_EMAIL_SENT_SUCCESS: (email: string) =>
    `Email has been sent to ${email}. Please complete your registration`,
  ACTIVATION_EMAIL_SENT_ERROR: (email: string) => `Email ${email} could not be verified. Please try again`,
  RESET_EMAIL_SUCCESS: (email: string) => `Email has been sent to ${email}. Click on the link to reset your password`,
  RESET_EMAIL_ERROR: (email: string) => `Email ${email} could not be verified. Please try again`,
  PASSWORD_RESET_SUCCESSFUL: 'Now you can log in using your new password',
  USER_ROLE_UPDATED: (role: string) => `User role was updated to ${role}`,
  USER_PHOTO_UPDATED: 'User photo was successfully uploaded',
  PHOTO_UPLOAD_FAILED: 'User photo uploading failed',
  USER_ACTIVATED: 'User activated successfully',
  USER_DELETED: 'User deleted successfully',
};
