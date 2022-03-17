import dotenv from 'dotenv';
import express, { Application } from 'express';

import Logger from 'library/logger.library';
import { messages } from 'constants/messages.constants';
import initialize from './initialize';

dotenv.config();

const app: Application = express();
initialize(app);

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => Logger.log.debug(messages.SERVER_STARED(ENV, PORT)));
