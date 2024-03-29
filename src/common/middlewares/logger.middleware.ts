import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(
        `[RESPONSE] ${req.ip} ${req.method} ${res.statusCode} ${req.originalUrl}`,
      );
    });
    this.logger.log(
      `[REQUEST] ${req.ip} ${req.method} ${
        req.originalUrl
      }\n[BODY] ${JSON.stringify(req.body, null, 2)}\n[QUERY] ${JSON.stringify(
        req.query,
        null,
        2,
      )}`,
    );

    next();
  }
}
