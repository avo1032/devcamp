import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HTTP');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    if (typeof error === 'string') {
      res.status(status).json({
        success: false,
        data: {
          error,
        },
      });
      this.logger.error(
        `[EXCEPTION FILTER] ${req.ip} ${req.method} ${req.originalUrl}\n[ERROR] ${error}`,
      );
    } else {
      res.status(status).json({
        success: false,
        data: {
          ...error,
        },
      });
      this.logger.error(
        `[EXCEPTION FILTER] ${req.ip} ${req.method} ${req.originalUrl}\n[ERROR] ${error.message} ${error.error}`,
      );
    }
  }
}
