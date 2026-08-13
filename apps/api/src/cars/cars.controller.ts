import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import type { ApiResponse, Car, Paginated } from '@vubach/shared';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  /** GET /api/cars?page=1&pageSize=12 */
  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ): Promise<ApiResponse<Paginated<Car>>> {
    const data = await this.carsService.findAll(
      page ? Number(page) : undefined,
      pageSize ? Number(pageSize) : undefined,
    );
    return { success: true, data };
  }

  /** GET /api/cars/:slug */
  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<ApiResponse<Car>> {
    const data = await this.carsService.findOne(slug);
    return { success: true, data };
  }

  /** POST /api/cars */
  @Post()
  async create(@Body() dto: CreateCarDto): Promise<ApiResponse<Car>> {
    const data = await this.carsService.create(dto);
    return { success: true, data };
  }
}
