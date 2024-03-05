import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `[REQUEST] ${req.ip} ${req.method} ${res.statusCode} ${
        req.originalUrl
      }\nbody : ${JSON.stringify(req.body, null, 2)}\nquery : ${JSON.stringify(
        req.query,
        null,
        2,
      )}`,
    );

    next();
  }
}
