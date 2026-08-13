import { Injectable, NotFoundException } from '@nestjs/common';
import type { Car, Paginated } from '@vubach/shared';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';

/** Turn a display name into a URL-safe, unique-ish slug. */
const slugify = (brand: string, model: string, year: number): string =>
  `${brand}-${model}-${year}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, pageSize = 12): Promise<Paginated<Car>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.prisma.car.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.car.count(),
    ]);
    return { items: items as unknown as Car[], total, page, pageSize };
  }

  async findOne(slug: string): Promise<Car> {
    const car = await this.prisma.car.findUnique({ where: { slug } });
    if (!car) throw new NotFoundException(`Car "${slug}" not found`);
    return car as unknown as Car;
  }

  async create(dto: CreateCarDto): Promise<Car> {
    const slug = slugify(dto.brand, dto.model, dto.year);
    const car = await this.prisma.car.create({
      data: { ...dto, slug },
    });
    return car as unknown as Car;
  }
}
