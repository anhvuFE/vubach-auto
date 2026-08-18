import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Guard that enforces a valid JWT via the 'jwt' Passport strategy. */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
