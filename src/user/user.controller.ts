import { Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Req() request: Request): Promise<void> {
    const payload = request.body;
    const response = await this.userService.create(payload);
    console.log('⚔️⚔️⚔️⚔️⚔️ ', response);
  }
}
