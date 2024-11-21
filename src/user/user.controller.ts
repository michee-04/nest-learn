import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IUserModel } from 'src/schema/types';
import { parseSortParam } from 'src/utils';
import { UserService } from './user.service';

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
    const filters = {
      page,
      limit,
      searchTerm: search,
      sort: parseSortParam(sortBy),
    };
    console.log('☂️☂️☂️', filters);

    const result = await this.userService.findAll(filters);
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.userService.findOne({ _id: id });
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
    const result = await this.userService.update({ _id: id }, updateUserDto);
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }

  // (soft delete)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.userService.delete({ _id: id });
    if (result.success) {
      return result;
    } else {
      throw result;
    }
  }

  @Post(':id/restore')
  async restore(@Param('id') id: string) {
    console.log('⚡⚡⚡⚡☂️☂️☂️☂️ id : ', id);

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
