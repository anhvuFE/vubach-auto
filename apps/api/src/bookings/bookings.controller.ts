import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import type { ApiResponse, Booking, Paginated } from '@vubach/shared';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { QueryBookingsDto } from './dto/query-bookings.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  /** POST /api/bookings — public: submit a test-drive/viewing request. */
  @Post()
  async create(@Body() dto: CreateBookingDto): Promise<ApiResponse<Booking>> {
    const data = await this.bookingsService.create(dto);
    return { success: true, data };
  }

  /** GET /api/bookings — admin: list leads with optional status filter. */
  @Get()
  async findAll(
    @Query() query: QueryBookingsDto,
  ): Promise<ApiResponse<Paginated<Booking>>> {
    const data = await this.bookingsService.findAll(query);
    return { success: true, data };
  }

  /** PATCH /api/bookings/:id/status */
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateBookingStatusDto,
  ): Promise<ApiResponse<Booking>> {
    const data = await this.bookingsService.updateStatus(id, dto);
    return { success: true, data };
  }

  /** DELETE /api/bookings/:id */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<{ id: string }>> {
    const data = await this.bookingsService.remove(id);
    return { success: true, data };
  }
}
