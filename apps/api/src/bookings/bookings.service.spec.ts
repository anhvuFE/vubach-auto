import { NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

/** Bản ghi Booking mẫu (dates là Date, giống Prisma trả về). */
const buildBooking = (overrides: Partial<Record<string, unknown>> = {}) => ({
  id: 'booking-1',
  kind: 'test-drive',
  carSlug: 'toyota-camry-2025',
  carName: 'Toyota Camry',
  name: 'Nguyễn Văn A',
  phone: '0912345678',
  preferredDate: new Date('2026-09-01'),
  note: null,
  status: 'pending',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
  ...overrides,
});

const createDto: CreateBookingDto = {
  kind: 'test-drive',
  carSlug: 'toyota-camry-2025',
  carName: 'Toyota Camry',
  name: 'Nguyễn Văn A',
  phone: '0912345678',
  preferredDate: '2026-09-01T00:00:00.000Z',
};

describe('BookingsService', () => {
  let service: BookingsService;
  let prisma: {
    booking: {
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
      booking: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    service = new BookingsService(prisma as unknown as PrismaService);
  });

  describe('create', () => {
    it('lưu booking và serialize date sang ISO string', async () => {
      prisma.booking.create.mockImplementation(({ data }) =>
        buildBooking({ ...data, preferredDate: new Date(data.preferredDate) }),
      );

      const result = await service.create(createDto);

      expect(prisma.booking.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          kind: 'test-drive',
          carSlug: 'toyota-camry-2025',
          name: 'Nguyễn Văn A',
          note: null,
        }),
      });
      expect(typeof result.createdAt).toBe('string');
      expect(result.preferredDate).toBe('2026-09-01T00:00:00.000Z');
    });

    it('preferredDate rỗng thì lưu null', async () => {
      prisma.booking.create.mockImplementation(({ data }) =>
        buildBooking({ ...data, preferredDate: null }),
      );

      const result = await service.create({ ...createDto, preferredDate: undefined });

      expect(prisma.booking.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ preferredDate: null }),
      });
      expect(result.preferredDate).toBeNull();
    });
  });

  describe('findAll', () => {
    it('mặc định page=1, pageSize=20, sort mới nhất trước', async () => {
      prisma.booking.findMany.mockResolvedValue([buildBooking()]);
      prisma.booking.count.mockResolvedValue(1);

      const result = await service.findAll({});

      expect(result).toEqual(
        expect.objectContaining({ total: 1, page: 1, pageSize: 20 }),
      );
      expect(prisma.booking.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 20,
      });
    });

    it('lọc theo status và carSlug khi được truyền', async () => {
      prisma.booking.findMany.mockResolvedValue([]);
      prisma.booking.count.mockResolvedValue(0);

      await service.findAll({ status: 'confirmed', carSlug: 'toyota-camry-2025' });

      const arg = prisma.booking.findMany.mock.calls[0][0];
      expect(arg.where).toEqual({
        status: 'confirmed',
        carSlug: 'toyota-camry-2025',
      });
    });
  });

  describe('updateStatus', () => {
    it('cập nhật status khi booking tồn tại', async () => {
      prisma.booking.findUnique.mockResolvedValue(buildBooking());
      prisma.booking.update.mockImplementation(({ data }) =>
        buildBooking({ status: data.status }),
      );

      const result = await service.updateStatus('booking-1', { status: 'confirmed' });

      expect(prisma.booking.update).toHaveBeenCalledWith({
        where: { id: 'booking-1' },
        data: { status: 'confirmed' },
      });
      expect(result.status).toBe('confirmed');
    });

    it('ném NotFoundException khi không tồn tại', async () => {
      prisma.booking.findUnique.mockResolvedValue(null);

      await expect(
        service.updateStatus('khong-ton-tai', { status: 'confirmed' }),
      ).rejects.toThrow(NotFoundException);
      expect(prisma.booking.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('xóa và trả về id khi tồn tại', async () => {
      prisma.booking.findUnique.mockResolvedValue(buildBooking());
      prisma.booking.delete.mockResolvedValue(buildBooking());

      await expect(service.remove('booking-1')).resolves.toEqual({ id: 'booking-1' });
      expect(prisma.booking.delete).toHaveBeenCalledWith({
        where: { id: 'booking-1' },
      });
    });

    it('ném NotFoundException và không gọi delete khi không tồn tại', async () => {
      prisma.booking.findUnique.mockResolvedValue(null);

      await expect(service.remove('khong-ton-tai')).rejects.toThrow(NotFoundException);
      expect(prisma.booking.delete).not.toHaveBeenCalled();
    });
  });
});
