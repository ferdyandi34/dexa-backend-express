const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    level: 'info', // Log levels: error, warn, info, http, debug
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(), // For color-coded logs in console
        logFormat
    ),
    transports: [
        new transports.Console(), // Log to console
        new transports.File({ filename: 'logs/app.log' }) // Log to file
    ]
});

module.exports = logger;
