import mongoose from 'mongoose';

import Logger from 'library/logger.library';
import { messages } from 'constants/messages.constants';

export default async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(`${process.env.CONNECTION_STRING}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    Logger.log.info(messages.DATABASE_CONNECTED(conn?.connection?.host));
  } catch (error) {
    Logger.log.error(messages.DATABASE_ERROR(error?.message));
    process.exit(1);
  }
};
