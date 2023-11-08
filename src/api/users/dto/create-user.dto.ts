import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().toLowerCase();
    }

    return value;
  })
  @IsNotEmpty({
    message: 'Username is required',
  })
  @IsString({
    message: 'Username must be a string',
  })
  @MaxLength(20, {
    message: 'Username must be shorter than or equal to 20 characters',
  })
  @MinLength(4, {
    message: 'Username must be longer than or equal to 4 characters',
  })
  @ApiProperty({
    type: 'string',
    example: 'somerandomuser',
  })
  username: string;
}
