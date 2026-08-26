import { Injectable, NotFoundException } from '@nestjs/common';
import type { Booking, Paginated } from '@vubach/shared';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { QueryBookingsDto } from './dto/query-bookings.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    const booking = await this.prisma.booking.create({
      data: {
        kind: dto.kind,
        carSlug: dto.carSlug,
        carName: dto.carName,
        name: dto.name,
        phone: dto.phone,
        preferredDate: dto.preferredDate ? new Date(dto.preferredDate) : null,
        note: dto.note ?? null,
      },
    });
    return this.toBooking(booking);
  }

  async findAll(query: QueryBookingsDto): Promise<Paginated<Booking>> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const where: Prisma.BookingWhereInput = {};
    if (query.status) where.status = query.status;
    if (query.carSlug) where.carSlug = query.carSlug;

    const [items, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      this.prisma.booking.count({ where }),
    ]);

    return { items: items.map((b) => this.toBooking(b)), total, page, pageSize };
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto): Promise<Booking> {
    await this.ensureExists(id);
    const booking = await this.prisma.booking.update({
      where: { id },
      data: { status: dto.status },
    });
    return this.toBooking(booking);
  }

  async remove(id: string): Promise<{ id: string }> {
    await this.ensureExists(id);
    await this.prisma.booking.delete({ where: { id } });
    return { id };
  }

  private async ensureExists(id: string): Promise<void> {
    const found = await this.prisma.booking.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`Booking "${id}" not found`);
  }

  /** Serialize Prisma dates to ISO strings for the shared wire type. */
  private toBooking(b: {
    id: string;
    kind: string;
    carSlug: string;
    carName: string;
    name: string;
    phone: string;
    preferredDate: Date | null;
    note: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): Booking {
    return {
      ...b,
      kind: b.kind as Booking['kind'],
      status: b.status as Booking['status'],
      preferredDate: b.preferredDate ? b.preferredDate.toISOString() : null,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    };
  }
}
