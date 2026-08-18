import { IsString, MinLength } from 'class-validator';

/** Validated body for POST /api/auth/refresh and POST /api/auth/logout. */
export class RefreshDto {
  @IsString() @MinLength(1) refreshToken!: string;
}
