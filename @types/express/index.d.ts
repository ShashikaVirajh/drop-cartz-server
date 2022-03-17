import { UserModel } from '../../src/api/user/user.model';
import { Environment } from '../../src/enums';
import { PaginatedResult } from '../../src/types';

declare global {
  namespace Express {
    interface Request {
      authUser: UserModel;
    }

    interface Response {
      paginatedResult: PaginatedResult;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: Environment;
      REQUEST_TYPE: string;
      REQUEST_BODY_MAX_SIZE: string;
      CONNECTION_STRING: string;
      BASE_URL: string;
      CLIENT_URL: string;
      S3_BUCKET_NAME: string;
      JWT_ACCESS_TOKEN_SECRET: string;
      JWT_ACCESS_TOKEN_TTL: string;
      JWT_ACTIVATION_TOKEN_SECRET: string;
      JWT_ACTIVATION_TOKEN_TTL: string;
      JWT_RESET_TOKEN_SECRET: string;
      JWT_RESET_TOKEN_TTL: string;
      AWS_REGION: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      FROM_EMAIL_ADDRESS: string;
      TO_EMAIL_ADDRESS: string;
    }
  }
}
