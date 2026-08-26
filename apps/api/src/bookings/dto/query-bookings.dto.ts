import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

/** Query params for GET /api/bookings (admin listing). */
export class QueryBookingsDto {
  @IsOptional()
  @IsIn(['pending', 'confirmed', 'cancelled', 'completed'])
  status?: string;

  @IsOptional() @IsString() carSlug?: string;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) pageSize?: number;
}
