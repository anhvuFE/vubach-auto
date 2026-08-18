import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export type CarSort =
    | `newest`
    | `price-asc`
    | `price-desc`
    | `year-desc`
    | `mileage-asc`;


//Query param Get /api/cars
export class QueryCarsDto {
    @IsOptional() @IsString() search?: string;
    @IsOptional() @IsString() brand?: string;
    @IsOptional() @IsString() bodyType?: string;
    @IsOptional() @IsString() fuelType?: string;
    @IsOptional() @IsString() transmission?: string;
    @IsOptional() @IsString() status?: string; // available | sold | reserved | all

    @IsOptional() @Type(() => Number) @IsInt() @Min(0) minPrice?: number;
    @IsOptional() @Type(() => Number) @IsInt() @Min(0) maxPrice?: number;
    @IsOptional() @Type(() => Number) @IsInt() minYear?: number;
    @IsOptional() @Type(() => Number) @IsInt() maxYear?: number;
    @IsOptional() @Type(() => Number) @IsInt() @Min(0) maxMileage?: number;

    @IsOptional()
    @IsIn(['newest', 'price-asc', 'price-desc', 'year-desc', 'mileage-asc'])
    sort?: CarSort;

    @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number;
    @IsOptional() @Type(() => Number) @IsInt() @Min(1) pageSize?: number;
}

