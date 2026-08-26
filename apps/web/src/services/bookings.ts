/**
 * Booking API client. Submits test-drive / viewing requests to the NestJS API.
 * Kept UI-agnostic so any component can call it. Types mirror @vubach/shared;
 * duplicated locally to match the existing web convention (see types/car.ts).
 */
import { SITE } from '@/constants/site';

export type BookingKind = 'test-drive' | 'schedule';

export interface BookingInput {
  kind: BookingKind;
  carSlug: string;
  carName: string;
  name: string;
  phone: string;
  /** ISO date string; optional. */
  preferredDate?: string | null;
  note?: string | null;
}

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * Create a booking. Resolves on success; throws an Error with a
 * user-presentable Vietnamese message on failure (network or validation).
 */
export async function createBooking(input: BookingInput): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${SITE.apiUrl}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch {
    // Network / CORS / server-down — the request never completed.
    throw new Error('Không thể kết nối máy chủ. Vui lòng thử lại hoặc gọi hotline.');
  }

  if (!res.ok) {
    let message = 'Gửi yêu cầu thất bại. Vui lòng thử lại.';
    try {
      const body = (await res.json()) as ApiEnvelope<unknown>;
      if (body?.message) message = body.message;
    } catch {
      /* keep default message */
    }
    throw new Error(message);
  }
}
