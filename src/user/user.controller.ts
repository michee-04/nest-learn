import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserModel } from 'src/schema/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const result = await this.userService.findAll();
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.userService.findById(id);
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }

  @Post()
  async create(@Body() createUserDto: Partial<IUserModel>) {
    const result = await this.userService.create(createUserDto);
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }
}
