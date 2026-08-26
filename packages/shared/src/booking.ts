/**
 * Booking (lead) domain types shared between the Next.js frontend and the
 * NestJS API. A booking is a test-drive or viewing request a visitor submits
 * from a car detail page. The car is referenced by slug + a denormalized name
 * so a lead survives even if the listing later changes or is removed.
 */

/** Whether the visitor wants to test-drive the car or just schedule a viewing. */
export type BookingKind = 'test-drive' | 'schedule';

/** Lifecycle of a booking as staff process it. */
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  kind: BookingKind;
  carSlug: string;
  carName: string;
  name: string;
  phone: string;
  /** ISO date string the visitor prefers; optional. */
  preferredDate?: string | null;
  note?: string | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

/** Payload sent when creating a booking (server assigns id/status/timestamps). */
export type BookingInput = Pick<
  Booking,
  'kind' | 'carSlug' | 'carName' | 'name' | 'phone'
> & {
  preferredDate?: string | null;
  note?: string | null;
};
