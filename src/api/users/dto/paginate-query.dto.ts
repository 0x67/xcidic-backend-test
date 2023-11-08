import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginateQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ default: 1, required: false })
  page: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ default: 100, required: false })
  itemPerPage: number;
}
