import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { ApiResponse, AuthResponse, AuthUser } from '@vubach/shared';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** POST /api/auth/register */
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
  ): Promise<ApiResponse<AuthResponse>> {
    const data = await this.authService.register(dto);
    return { success: true, data };
  }

  /** POST /api/auth/login */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<ApiResponse<AuthResponse>> {
    const data = await this.authService.login(dto);
    return { success: true, data };
  }

  /** POST /api/auth/refresh — rotate a refresh token for a new token pair. */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body() dto: RefreshDto,
  ): Promise<ApiResponse<AuthResponse>> {
    const data = await this.authService.refresh(dto.refreshToken);
    return { success: true, data };
  }

  /** POST /api/auth/logout — revoke a refresh token. */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Body() dto: RefreshDto,
  ): Promise<ApiResponse<{ revoked: true }>> {
    await this.authService.logout(dto.refreshToken);
    return { success: true, data: { revoked: true } };
  }

  /** GET /api/auth/me — returns the authenticated user. */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthUser): ApiResponse<AuthUser> {
    return { success: true, data: user };
  }
}
