import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('⚡⚡⚡☂️☂️☂️ createUserDto : ', createUserDto);

    return await this.userService.create(createUserDto);
  }
}
