import { Controller, Get, Query, Body, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/api/auth/auth.guard';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { PaginateQueryDto } from 'src/api/users/dto/paginate-query.dto';
import { UsersService } from 'src/api/users/users.service';
import { UserEntity } from 'src/database/entity/user.entity';

class PaginationData {
  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  itemPerPage: number;

  @ApiProperty()
  page: number;
}

class PaginateResponse {
  @ApiProperty()
  pagination: PaginationData;
}

class PaginatedUserResponse extends PaginateResponse {
  @ApiProperty({ type: [UserEntity] })
  data: UserEntity[];
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiQuery({
    type: PaginateQueryDto,
  })
  @ApiResponse({
    status: 200,
    type: PaginatedUserResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  async findAll(@Query() query: PaginateQueryDto): Promise<{
    data: UserEntity[];
    pagination: {
      totalPage: number;
      itemPerPage: number;
      page: number;
    };
  }> {
    const users = await this.usersService.findAll(query);
    return users;
  }

  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(dto);
  }
}
