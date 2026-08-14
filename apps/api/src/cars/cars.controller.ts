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
import type { ApiResponse, Car, Paginated } from '@vubach/shared';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { QueryCarsDto } from './dto/query-cars.dto';
import { UpdateCarDto } from './dto/update-car.dto';
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  /** GET /api/cars?page=1&pageSize=12 */
  @Get()
  async findAll(
    @Query() query: QueryCarsDto,
  ): Promise<ApiResponse<Paginated<Car>>> {
    const data = await this.carsService.findAll(query);
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

  /** PATCH /api/cars/:slug */
  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() dto: UpdateCarDto,
  ): Promise<ApiResponse<Car>> {
    const data = await this.carsService.update(slug, dto);
    return { success: true, data };
  }

  /** DELETE /api/cars/:slug */
  @Delete(':slug')
  async remove(@Param('slug') slug: string): Promise<ApiResponse<{ slug: string }>> {
    const data = await this.carsService.remove(slug);
    return { success: true, data };
  }
}
