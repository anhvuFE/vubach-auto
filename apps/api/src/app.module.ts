import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { BookingsModule } from './bookings/bookings.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Loads .env once, globally, so ConfigService is injectable everywhere.
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CarsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
