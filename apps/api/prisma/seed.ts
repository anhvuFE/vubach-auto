import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const slugify = (brand: string, model: string, year: number): string =>
    `${brand}-${model}-${year}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const cars = [
    {
        brand: 'Toyota',
        model: 'Camry 2.5Q',
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
        description: 'Toyota Camry 2.5Q – sedan hạng D sang trọng, vận hành êm ái.',
        features: ['Camera 360', 'Ghế da chỉnh điện', 'Cửa sổ trời'],
        images: [
            'https://picsum.photos/seed/camry1/800/600',
            'https://picsum.photos/seed/camry2/800/600',
        ],
        mainImage: 'https://picsum.photos/seed/camry1/800/600',
        status: 'available',
        isFeatured: true,
        contactName: 'Vũ Bách Auto',
        contactPhone: '0975224557',
    },
    {
        brand: 'Mercedes-Benz',
        model: 'C200 Avantgarde',
        year: 2023,
        price: 1_590_000_000,
        mileage: 22000,
        transmission: 'Số tự động',
        fuelType: 'Xăng',
        bodyType: 'Sedan',
        condition: 'Tốt',
        color: 'Trắng',
        seats: 5,
        origin: 'Lắp ráp',
        description: 'Mercedes-Benz C200 Avantgarde sang trọng, nội thất tinh tế.',
        features: ['Màn hình MBUX', 'Đèn LED', 'Cảm biến lùi'],
        images: [
            'https://picsum.photos/seed/c2001/800/600',
            'https://picsum.photos/seed/c2002/800/600',
        ],
        mainImage: 'https://picsum.photos/seed/c2001/800/600',
        status: 'available',
        isFeatured: true,
        contactName: 'Vũ Bách Auto',
        contactPhone: '0975224557',
    },
    {
        brand: 'Ford',
        model: 'Ranger Wildtrak',
        year: 2022,
        price: 850_000_000,
        mileage: 45000,
        transmission: 'Số tự động',
        fuelType: 'Dầu',
        bodyType: 'Pickup',
        condition: 'Tốt',
        color: 'Cam',
        seats: 5,
        origin: 'Nhập khẩu',
        description: 'Ford Ranger Wildtrak mạnh mẽ, phù hợp cả phố và địa hình.',
        features: ['4x4', 'Cruise control', 'Bệ bước'],
        images: [
            'https://picsum.photos/seed/ranger1/800/600',
            'https://picsum.photos/seed/ranger2/800/600',
        ],
        mainImage: 'https://picsum.photos/seed/ranger1/800/600',
        status: 'available',
        isFeatured: false,
        contactName: 'Vũ Bách Auto',
        contactPhone: '0975224557',
    },
];

async function main() {
    for (const car of cars) {
        const slug = slugify(car.brand, car.model, car.year);
        await prisma.car.upsert({
            where: { slug },
            update: car,
            create: { ...car, slug },
        });
    }
    console.log(`✅ Seeded ${cars.length} cars`);
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });