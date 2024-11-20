import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL_NAME, UserModel } from 'src/schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER_MODEL_NAME, schema: UserModel.schema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
