import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { PaginateQueryDto } from 'src/api/users/dto/paginate-query.dto';
import { UserEntity } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username.trim().toLowerCase(),
      },
    });

    return user;
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findOne(data.username);

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findAll(query: PaginateQueryDto) {
    let itemPerPage = 100;
    let page = 1;

    if (query.itemPerPage) {
      itemPerPage = query.itemPerPage;
    } else if (query.itemPerPage <= 0 || query.itemPerPage > 100) {
      itemPerPage = 100;
    }

    if (query.page) {
      page = query.page;
    } else if (query.page <= 0) {
      page = 1;
    }

    const count = await this.userRepository.count();
    const totalPage = Math.ceil(count / itemPerPage);

    const users = await this.userRepository.find({
      take: itemPerPage,
      skip: itemPerPage * (page - 1),
    });

    return {
      data: users,
      pagination: {
        totalPage,
        itemPerPage,
        page,
      },
    };
  }
}
