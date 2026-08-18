import { Injectable, NotFoundException } from '@nestjs/common';
import type { Car, Paginated } from '@vubach/shared';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';

import { Prisma } from '@prisma/client';
import { QueryCarsDto } from './dto/query-cars.dto';

import { UpdateCarDto } from './dto/update-car.dto';

/** Turn a display name into a URL-safe base slug (chưa đảm bảo unique). */
const slugify = (brand: string, model: string, year: number): string =>
  `${brand}-${model}-${year}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const ORDER_BY: Record<string, Prisma.CarOrderByWithRelationInput> = {
  newest: { createdAt: 'desc' },
  'price-asc': { price: 'asc' },
  'price-desc': { price: 'desc' },
  'year-desc': { year: 'desc' },
  'mileage-asc': { mileage: 'asc' },
};

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(query: QueryCarsDto): Promise<Paginated<Car>> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 12;
    const skip = (page - 1) * pageSize;

    // Dựng điều kiện lọc động — chỉ thêm field nào client thực sự gửi lên.
    const where: Prisma.CarWhereInput = {};

    if (query.search) {
      where.OR = [
        { brand: { contains: query.search, mode: 'insensitive' } },
        { model: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.brand) where.brand = query.brand;
    if (query.bodyType) where.bodyType = query.bodyType;
    if (query.fuelType) where.fuelType = query.fuelType;
    if (query.transmission) where.transmission = query.transmission;
    if (query.status && query.status !== 'all') where.status = query.status;

    if (query.minPrice != null || query.maxPrice != null) {
      where.price = { gte: query.minPrice, lte: query.maxPrice };
    }
    if (query.minYear != null || query.maxYear != null) {
      where.year = { gte: query.minYear, lte: query.maxYear };
    }
    if (query.maxMileage != null) {
      where.mileage = { lte: query.maxMileage };
    }

    const orderBy = ORDER_BY[query.sort ?? 'newest'];

    const [items, total] = await Promise.all([
      this.prisma.car.findMany({ where, orderBy, skip, take: pageSize }),
      this.prisma.car.count({ where }),
    ]);

    return { items: items as unknown as Car[], total, page, pageSize };
  }

  async findOne(slug: string): Promise<Car> {
    const car = await this.prisma.car.findUnique({ where: { slug } });
    if (!car) throw new NotFoundException(`Car "${slug}" not found`);
    return car as unknown as Car;
  }

  async create(dto: CreateCarDto): Promise<Car> {
    const slug = await this.uniqueSlug(dto.brand, dto.model, dto.year);
    const car = await this.prisma.car.create({
      data: { ...dto, slug },
    });
    return car as unknown as Car;
  }

  async update(slug: string, dto: UpdateCarDto): Promise<Car> {
    const existing = await this.prisma.car.findUnique({ where: { slug } });
    if (!existing) throw new NotFoundException(`Car "${slug}" not found`);

    // Nếu brand/model/year thay đổi thì sinh lại slug cho khớp dữ liệu mới.
    const brand = dto.brand ?? existing.brand;
    const model = dto.model ?? existing.model;
    const year = dto.year ?? existing.year;

    const identityChanged =
      brand !== existing.brand ||
      model !== existing.model ||
      year !== existing.year;

    const nextSlug = identityChanged
      ? await this.uniqueSlug(brand, model, year, existing.id)
      : existing.slug;

    const car = await this.prisma.car.update({
      where: { slug },
      data: { ...dto, slug: nextSlug },
    });
    return car as unknown as Car;
  }

  /**
   * Sinh slug duy nhất từ brand/model/year; nếu trùng thì thêm hậu tố -2, -3…
   * `excludeId` để bỏ qua chính bản ghi đang cập nhật.
   */
  private async uniqueSlug(
    brand: string,
    model: string,
    year: number,
    excludeId?: string,
  ): Promise<string> {
    const base = slugify(brand, model, year);
    let candidate = base;
    let suffix = 2;

    // Lặp cho tới khi tìm được slug chưa bị bản ghi khác chiếm dụng.
    while (true) {
      const clash = await this.prisma.car.findUnique({
        where: { slug: candidate },
      });
      if (!clash || clash.id === excludeId) return candidate;
      candidate = `${base}-${suffix}`;
      suffix += 1;
    }
  }

  async remove(slug: string): Promise<{ slug: string }> {
    await this.findOne(slug); // Kiểm tra xem xe có tồn tại không
    await this.prisma.car.delete({
      where: { slug },
    });
    return { slug };
  }
}
