import pino from 'pino';

const level = process.env.LOG_LEVEL || 'info';

// Pretty print in development for readability
const transport = process.env.NODE_ENV === 'development'
  ? { target: 'pino-pretty', options: { translateTime: 'SYS:standard', ignore: 'pid,hostname' } }
  : undefined;

export const logger = pino({ level }, transport ? { transport } : {});

export function logRequest(req, _res, next){
  logger.debug({ method: req.method, url: req.originalUrl }, 'request');
  next();
}

export function logError(err, req, res, next){
  logger.error({ err, method: req.method, url: req.originalUrl }, 'error');
  res.status(500).json({ message: 'Sunucu hatası' });
}
