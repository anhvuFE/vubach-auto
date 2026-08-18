/**
 * Authentication domain types shared between the Next.js frontend and the
 * NestJS API. Framework-agnostic so both sides agree on the wire shape.
 */

export type UserRole = 'USER' | 'ADMIN';

/** A user account as exposed to clients — never includes the password hash. */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/** Payload accepted by POST /api/auth/register. */
export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

/** Payload accepted by POST /api/auth/login. */
export interface LoginInput {
  email: string;
  password: string;
}

/** Payload accepted by POST /api/auth/refresh and POST /api/auth/logout. */
export interface RefreshInput {
  refreshToken: string;
}

/**
 * Envelope returned by register/login/refresh: a short-lived access JWT, a
 * long-lived opaque refresh token (rotated on each refresh), and the safe user.
 */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

/** Shape encoded inside the JWT payload (`sub` is the user id). */
export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
