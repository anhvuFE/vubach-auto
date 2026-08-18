import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { AuthUser, JwtPayload } from '@vubach/shared';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';

/**
 * Validates the Bearer token on protected routes. Passport calls `validate()`
 * with the decoded payload; whatever it returns is attached to `request.user`.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') ?? 'dev-insecure-secret',
    });
  }

  /** Re-fetch the user so a token for a deleted account is rejected. */
  async validate(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.authService.findById(payload.sub);
    if (!user) throw new UnauthorizedException('User no longer exists');
    return user;
  }
}
