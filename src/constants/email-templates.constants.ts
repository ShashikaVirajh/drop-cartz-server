import { ActivationEmailPayload, ResetEmailPayload } from 'types';

export const activationEmailParams = ({ email, firstName, token }: ActivationEmailPayload) => {
  return {
    Source: process.env.FROM_EMAIL_ADDRESS,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <html>
                <h1>Verify your email address</h1>
                <h3>Hi ${firstName}, please use the following link to complete your registration.</h3>
                <p>${process.env.BASE_URL}/users/activate/${token}</p>
                <h4>- Team DropCart -</h4>
            </html>
        `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Complete your registration',
      },
    },
  };
};

export const resetPasswordEmailParams = ({ email, token }: ResetEmailPayload) => {
  return {
    Source: process.env.FROM_EMAIL_ADDRESS,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <html>
                <h1>Reset Password Link</h1>
                <h3>Please use the following link to reset your password:</h3>
                <p>${process.env.BASE_URL}/auth/password/reset/${token}</p>
                <h4>- Team DropCart -</h4>
            </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Password reset link',
      },
    },
  };
};
