import { NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

/** Bản ghi Car mẫu, đủ field để service trả về mà không cần DB thật. */
const buildCar = (overrides: Partial<Record<string, unknown>> = {}) => ({
  id: 'car-1',
  slug: 'toyota-camry-2025',
  brand: 'Toyota',
  model: 'Camry',
  year: 2025,
  price: 1_450_000_000,
  mileage: 8000,
  transmission: 'Số tự động',
  fuelType: 'Xăng',
  bodyType: 'Sedan',
  condition: 'Như mới',
  color: 'Đen',
  seats: 5,
  origin: 'Nhập khẩu',
  description: 'Toyota Camry',
  features: [],
  images: [],
  mainImage: 'https://example.com/1.jpg',
  status: 'available',
  isFeatured: false,
  contactPhone: null,
  contactName: null,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
  ...overrides,
});

const createDto: CreateCarDto = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2025,
  price: 1_450_000_000,
  mileage: 8000,
  transmission: 'Số tự động',
  fuelType: 'Xăng',
  bodyType: 'Sedan',
  condition: 'Như mới',
  color: 'Đen',
  seats: 5,
  origin: 'Nhập khẩu',
  description: 'Toyota Camry',
  features: [],
  images: [],
  mainImage: 'https://example.com/1.jpg',
};

describe('CarsService', () => {
  let service: CarsService;
  let prisma: {
    car: {
      findMany: jest.Mock;
      count: jest.Mock;
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(() => {
    prisma = {
      car: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    service = new CarsService(prisma as unknown as PrismaService);
  });

  describe('findAll', () => {
    it('mặc định page=1, pageSize=12, sort=newest và trả về paginated', async () => {
      const items = [buildCar()];
      prisma.car.findMany.mockResolvedValue(items);
      prisma.car.count.mockResolvedValue(1);

      const result = await service.findAll({});

      expect(result).toEqual({ items, total: 1, page: 1, pageSize: 12 });
      expect(prisma.car.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 12,
      });
    });

    it('tính skip đúng theo page/pageSize', async () => {
      prisma.car.findMany.mockResolvedValue([]);
      prisma.car.count.mockResolvedValue(0);

      await service.findAll({ page: 3, pageSize: 10 });

      expect(prisma.car.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 20, take: 10 }),
      );
    });

    it('dựng where động: search (OR), khoảng giá, năm, số km, status', async () => {
      prisma.car.findMany.mockResolvedValue([]);
      prisma.car.count.mockResolvedValue(0);

      await service.findAll({
        search: 'camry',
        brand: 'Toyota',
        minPrice: 1_000_000_000,
        maxPrice: 2_000_000_000,
        minYear: 2020,
        maxYear: 2025,
        maxMileage: 50_000,
        status: 'available',
        sort: 'price-asc',
      });

      const arg = prisma.car.findMany.mock.calls[0][0];
      expect(arg.where.OR).toHaveLength(3);
      expect(arg.where.brand).toBe('Toyota');
      expect(arg.where.price).toEqual({ gte: 1_000_000_000, lte: 2_000_000_000 });
      expect(arg.where.year).toEqual({ gte: 2020, lte: 2025 });
      expect(arg.where.mileage).toEqual({ lte: 50_000 });
      expect(arg.where.status).toBe('available');
      expect(arg.orderBy).toEqual({ price: 'asc' });
    });

    it('status="all" thì không lọc theo status', async () => {
      prisma.car.findMany.mockResolvedValue([]);
      prisma.car.count.mockResolvedValue(0);

      await service.findAll({ status: 'all' });

      const arg = prisma.car.findMany.mock.calls[0][0];
      expect(arg.where.status).toBeUndefined();
    });
  });

  describe('findOne', () => {
    it('trả về xe khi tồn tại', async () => {
      const car = buildCar();
      prisma.car.findUnique.mockResolvedValue(car);

      await expect(service.findOne('toyota-camry-2025')).resolves.toEqual(car);
    });

    it('ném NotFoundException khi không tồn tại', async () => {
      prisma.car.findUnique.mockResolvedValue(null);

      await expect(service.findOne('khong-ton-tai')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('sinh slug từ brand/model/year khi chưa trùng', async () => {
      prisma.car.findUnique.mockResolvedValue(null);
      prisma.car.create.mockImplementation(({ data }) => buildCar(data));

      await service.create(createDto);

      expect(prisma.car.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ slug: 'toyota-camry-2025' }),
      });
    });

    it('thêm hậu tố -2 khi slug đã bị chiếm', async () => {
      prisma.car.findUnique
        .mockResolvedValueOnce(buildCar()) // base slug đã tồn tại
        .mockResolvedValueOnce(null); // -2 còn trống
      prisma.car.create.mockImplementation(({ data }) => buildCar(data));

      await service.create(createDto);

      expect(prisma.car.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ slug: 'toyota-camry-2025-2' }),
      });
    });
  });

  describe('update', () => {
    it('ném NotFoundException khi xe không tồn tại', async () => {
      prisma.car.findUnique.mockResolvedValue(null);

      await expect(
        service.update('khong-ton-tai', { price: 1 }),
      ).rejects.toThrow(NotFoundException);
      expect(prisma.car.update).not.toHaveBeenCalled();
    });

    it('giữ nguyên slug khi brand/model/year không đổi', async () => {
      const existing = buildCar();
      prisma.car.findUnique.mockResolvedValue(existing);
      prisma.car.update.mockImplementation(({ data }) => buildCar(data));

      await service.update('toyota-camry-2025', { price: 999 });

      expect(prisma.car.update).toHaveBeenCalledWith({
        where: { slug: 'toyota-camry-2025' },
        data: expect.objectContaining({ price: 999, slug: 'toyota-camry-2025' }),
      });
    });

    it('sinh lại slug khi đổi model (và bỏ qua chính bản ghi đang sửa)', async () => {
      const existing = buildCar();
      // 1) findOne-thay-thế trong update lấy existing
      // 2) uniqueSlug kiểm tra slug mới -> chưa ai chiếm
      prisma.car.findUnique
        .mockResolvedValueOnce(existing)
        .mockResolvedValueOnce(null);
      prisma.car.update.mockImplementation(({ data }) => buildCar(data));

      await service.update('toyota-camry-2025', { model: 'Corolla' });

      expect(prisma.car.update).toHaveBeenCalledWith({
        where: { slug: 'toyota-camry-2025' },
        data: expect.objectContaining({ slug: 'toyota-corolla-2025' }),
      });
    });

    it('bỏ qua chính nó khi slug mới trùng đúng bản ghi đang sửa', async () => {
      const existing = buildCar();
      prisma.car.findUnique
        .mockResolvedValueOnce(existing)
        // uniqueSlug: slug mới trùng nhưng là chính existing.id -> chấp nhận
        .mockResolvedValueOnce(buildCar({ slug: 'toyota-corolla-2025' }));
      prisma.car.update.mockImplementation(({ data }) => buildCar(data));

      await service.update('toyota-camry-2025', { model: 'Corolla' });

      expect(prisma.car.update).toHaveBeenCalledWith({
        where: { slug: 'toyota-camry-2025' },
        data: expect.objectContaining({ slug: 'toyota-corolla-2025' }),
      });
    });
  });

  describe('remove', () => {
    it('xóa và trả về slug khi tồn tại', async () => {
      prisma.car.findUnique.mockResolvedValue(buildCar());
      prisma.car.delete.mockResolvedValue(buildCar());

      await expect(service.remove('toyota-camry-2025')).resolves.toEqual({
        slug: 'toyota-camry-2025',
      });
      expect(prisma.car.delete).toHaveBeenCalledWith({
        where: { slug: 'toyota-camry-2025' },
      });
    });

    it('ném NotFoundException và không gọi delete khi không tồn tại', async () => {
      prisma.car.findUnique.mockResolvedValue(null);

      await expect(service.remove('khong-ton-tai')).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.car.delete).not.toHaveBeenCalled();
    });
  });
});
