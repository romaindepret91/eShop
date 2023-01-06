import winston from "winston";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "logs/errors.log",
      handleExceptions: true,
      handleRejections: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
      ),
    }),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      handleRejections: true,
      format: winston.format.combine(
        winston.format.printf((log) => log.message),
        winston.format.colorize()
      ),
    }),
  ],
});
