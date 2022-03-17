export default {
  ACTIVATION_EMAIL_SENT_SUCCESS: (email: string) =>
    `Email has been sent to ${email}. Please complete your registration`,
  ACTIVATION_EMAIL_SENT_ERROR: (email: string) => `Email ${email} could not be verified. Please try again`,
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  INVALID_CREDENTIALS: 'Email or password is incorrect',
  ACCOUNT_PENDING: 'Please activate your account from your email.',
};
