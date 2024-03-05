import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SuccessInterceptor<T> implements NestInterceptor<T, any> {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
