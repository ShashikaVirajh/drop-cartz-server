import { SES } from 'aws-sdk';

import Logger from 'library/logger.library';
import { Error } from 'types';
import { activationEmailParams, resetPasswordEmailParams } from 'constants/email-templates.constants';
import { ActivationEmailPayload, ResetEmailPayload } from 'types';

class EmailHandler {
  static sendActivationEmail = (emailData: ActivationEmailPayload) => {
    const ses = new SES({ apiVersion: '2010-12-01' });

    const emailParams = activationEmailParams(emailData);
    const sendEmail = ses.sendEmail(emailParams).promise();

    const emailSuccessStatus = sendEmail
      .then(() => true)
      .catch((error: Error) => {
        Logger.log.error(error?.message);
        return false;
      });

    return emailSuccessStatus;
  };

  static sendResetPasswordEmail = (emailData: ResetEmailPayload) => {
    const ses = new SES({ apiVersion: '2010-12-01' });

    const emailParams = resetPasswordEmailParams(emailData);
    const sendEmail = ses.sendEmail(emailParams).promise();

    const emailSuccessStatus = sendEmail
      .then(() => true)
      .catch((error: Error) => {
        Logger.log.error(error?.message);
        return false;
      });

    return emailSuccessStatus;
  };
}

export default EmailHandler;
