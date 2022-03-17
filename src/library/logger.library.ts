import { createLogger, format, transports } from 'winston';
const { colorize, combine, printf, timestamp } = format;

class Logger {
  static log = createLogger({
    level: 'debug',
    format: combine(
      printf(obj => obj.message),
      colorize({ all: true }),
    ),
    transports: [new transports.Console()],
  });

  static detailedLog = createLogger({
    level: 'debug',
    format: format.combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      printf(obj => `${obj.timestamp} ${obj.level}: ${obj.message || obj.errmsg}`),
      colorize({ all: true }),
    ),
    transports: [new transports.Console()],
  });
  static logLevels: any;
}

export default Logger;
