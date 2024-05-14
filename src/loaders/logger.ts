import config from '../config/index';
import winston, {format} from 'winston';
const {timestamp, combine, errors, printf} = format;

const logFormat = printf(({level, message, timestamp, stack}) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: combine(
    format.colorize(),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    errors({stack: true}),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

export default LoggerInstance;
