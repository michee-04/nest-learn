// user.service.ts
import { Injectable } from '@nestjs/common';
import { BaseService } from '@nodesandbox/repo-framework';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from './user.repo';
import { IUserModel } from 'src/schema/types';

@Injectable()
export class UserService extends BaseService<IUserModel, UserRepository> {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserModel>,
  ) {
    const userRepo = new UserRepository(userModel);
    super(userRepo, {
      softDelete: true,
      search: {
        enabled: true,
        fields: ['name', 'email', 'username'],
      },
      filter: {
        allowedFields: [],
      },
    });
  }
}
