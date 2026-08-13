import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

/** Validated request body for creating a car. Mirrors CarInput from @vubach/shared. */
export class CreateCarDto {
  @IsString() brand!: string;
  @IsString() model!: string;
  @IsInt() @Min(1900) year!: number;
  @IsInt() @Min(0) price!: number;
  @IsInt() @Min(0) mileage!: number;
  @IsString() transmission!: string;
  @IsString() fuelType!: string;
  @IsString() bodyType!: string;
  @IsString() condition!: string;
  @IsString() color!: string;
  @IsInt() @Min(1) seats!: number;
  @IsString() origin!: string;
  @IsString() description!: string;
  @IsArray() @IsString({ each: true }) features!: string[];
  @IsArray() @IsString({ each: true }) images!: string[];
  @IsString() mainImage!: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsBoolean() isFeatured?: boolean;
  @IsOptional() @IsString() contactPhone?: string;
  @IsOptional() @IsString() contactName?: string;
}
