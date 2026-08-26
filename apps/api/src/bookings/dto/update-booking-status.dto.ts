import { IsIn } from 'class-validator';
import type { BookingStatus } from '@vubach/shared';

/** Body for PATCH /api/bookings/:id/status. */
export class UpdateBookingStatusDto {
  @IsIn(['pending', 'confirmed', 'cancelled', 'completed'])
  status!: BookingStatus;
}
