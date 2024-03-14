import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const logger = new Logger('USER');
    const request = ctx.switchToHttp().getRequest();
    logger.log(`{ userEmail: ${request.user.email} }`);
    return request.user;
  },
);
