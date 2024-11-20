import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUserModel } from 'src/schema/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
  ) {
    const result = await this.userService.findAll({
      page,
      limit,
      searchTerm: search,
      sort: sortBy ? { [sortBy]: 1 } : undefined,
    });
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<IUserModel>,
  ) {
    const result = await this.userService.updateById(id, updateUserDto);
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }

  // (soft delete)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.userService.deleteById(id);
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }

  @Post(':id/restore')
  async restore(@Param('id') id: string) {
    const result = await this.userService.restoreById(id);
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }

  @Post('batch')
  async batchCreate(@Body() users: Partial<IUserModel>[]) {
    const result = await this.userService.bulkCreate(users);
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }

  @Get('export')
  async exportData(@Query('format') format: 'json' | 'csv' = 'json') {
    const result = await this.userService.exportData({}, format);
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }

  @Get('aggregate/:pipeline')
  async aggregate(@Param('pipeline') pipeline: string, @Query() params: any) {
    const result = await this.userService.aggregate(pipeline, params);
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }
}
