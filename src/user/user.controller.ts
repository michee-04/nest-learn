import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  Session,
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

  @Put('batch/update')
  async batchUpdate(
    @Body()
    body: {
      updates: { filter: Record<string, any>; update: Partial<IUserModel> }[];
    },
  ) {
    const { updates } = body;

    if (!updates || !Array.isArray(updates)) {
      throw new Error('Invalid request body: "updates" must be an array.');
    }

    const result = await this.userService.batchUpdate(updates);

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

  @Post('auth')
  async loginUser(
    @Body() credentials: { username: string },
    @Req() req: Request,
    @Session() session: Record<string, any>,
    @Res() res,
  ) {
    const { username } = credentials;
    const result = await this.userService.exists({ username });

    if (result) {
      return res.json({ message: 'Connexion reussie ' });
    } else {
      session.oldInput = credentials;
      const oldInput = session.oldInput;
      const errorMessage = 'Utilisateur introuvable';

      return res.render('index', { oldInput, error: errorMessage });
    }
  }

  @Get('login')
  async renderLogin(@Query('error') error?: string) {
    return { error };
  }
}
