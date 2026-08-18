import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type {
  AuthResponse,
  AuthUser,
  JwtPayload,
  UserRole,
} from '@vubach/shared';
import * as bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

/** Cost factor for bcrypt hashing — 10 is a sane default for API workloads. */
const SALT_ROUNDS = 10;

/** Row shape returned by Prisma for the User model. */
type UserRow = {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AuthService {
  /** Refresh-token lifetime in days; drives the DB `expiresAt` column. */
  private readonly refreshTtlDays: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    config: ConfigService,
  ) {
    this.refreshTtlDays = Number(
      config.get<string>('JWT_REFRESH_EXPIRES_DAYS') ?? '7',
    );
  }

  /** Create a new account, rejecting duplicate emails. */
  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already registered');

    const password = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.prisma.user.create({
      data: { email: dto.email, name: dto.name, password },
    });
    return this.issueTokens(user);
  }

  /** Verify credentials and return a fresh token pair on success. */
  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid email or password');

    return this.issueTokens(user);
  }

  /**
   * Exchange a valid, unexpired, unrevoked refresh token for a new token pair.
   * The presented token is revoked (rotation) so it can only be used once.
   */
  async refresh(rawToken: string): Promise<AuthResponse> {
    const tokenHash = this.hashToken(rawToken);
    const record = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!record || record.revokedAt || record.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Rotate: burn the presented token before minting a replacement.
    await this.prisma.refreshToken.update({
      where: { id: record.id },
      data: { revokedAt: new Date() },
    });

    return this.issueTokens(record.user);
  }

  /** Revoke a refresh token (logout). Idempotent — unknown tokens are ignored. */
  async logout(rawToken: string): Promise<void> {
    const tokenHash = this.hashToken(rawToken);
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  /** Look up a user by id for the JWT strategy; null if not found. */
  async findById(id: string): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toAuthUser(user) : null;
  }

  /** Sign an access JWT, persist a rotated refresh token, and return the pair. */
  private async issueTokens(user: UserRow): Promise<AuthResponse> {
    const safeUser = this.toAuthUser(user);
    const payload: JwtPayload = {
      sub: safeUser.id,
      email: safeUser.email,
      role: safeUser.role,
    };
    const accessToken = this.jwt.sign(payload);
    const refreshToken = await this.createRefreshToken(safeUser.id);
    return { accessToken, refreshToken, user: safeUser };
  }

  /** Generate a high-entropy refresh token, store only its hash, return the raw. */
  private async createRefreshToken(userId: string): Promise<string> {
    const rawToken = randomBytes(48).toString('hex');
    const expiresAt = new Date(
      Date.now() + this.refreshTtlDays * 24 * 60 * 60 * 1000,
    );
    await this.prisma.refreshToken.create({
      data: { tokenHash: this.hashToken(rawToken), userId, expiresAt },
    });
    return rawToken;
  }

  /** SHA-256 is enough for high-entropy tokens (no salt/stretching needed). */
  private hashToken(rawToken: string): string {
    return createHash('sha256').update(rawToken).digest('hex');
  }

  /** Strip the password hash and normalize types for the wire. */
  private toAuthUser(user: UserRow): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
