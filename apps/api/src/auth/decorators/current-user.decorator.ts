import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthUser } from '@vubach/shared';

/**
 * Injects the authenticated user (attached to the request by JwtStrategy) into
 * a handler parameter: `@CurrentUser() user: AuthUser`.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthUser;
  },
);
