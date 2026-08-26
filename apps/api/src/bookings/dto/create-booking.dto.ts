import {
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import type { BookingKind } from '@vubach/shared';

/** Validated request body for creating a booking. Mirrors BookingInput. */
export class CreateBookingDto {
  @IsIn(['test-drive', 'schedule'])
  kind!: BookingKind;

  @IsString() carSlug!: string;
  @IsString() carName!: string;

  @IsString() @MaxLength(120) name!: string;

  // Vietnamese mobile format: leading 0 + 9 digits.
  @Matches(/^0\d{9}$/, { message: 'phone must be a valid VN mobile number' })
  phone!: string;

  @IsOptional() @IsISO8601() preferredDate?: string;

  @IsOptional() @IsString() @MaxLength(1000) note?: string;
}
