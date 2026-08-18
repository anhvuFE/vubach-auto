import { IsEmail, IsString, MinLength } from 'class-validator';

/** Validated request body for POST /api/auth/login. Mirrors LoginInput. */
export class LoginDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(1) password!: string;
}
