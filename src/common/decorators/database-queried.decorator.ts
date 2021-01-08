import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const EntityBeingQueried = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const entityId = request.params.id;
    console.log(request);
  }
);
