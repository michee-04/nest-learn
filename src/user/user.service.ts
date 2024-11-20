import { Injectable } from '@nestjs/common';
import { BaseService } from '@nodesandbox/repo-framework';
import { IUserModel } from 'src/schema/types';
import { UserModel } from 'src/schema/user.schema';
import { UserRepository } from './user.repo';

@Injectable()
export class UserService extends BaseService<IUserModel, UserRepository> {
  constructor() {
    const userRepo = new UserRepository(UserModel);
    super(userRepo, true, []);
    this.allowedFilterFields = [];
    this.searchFields = ['name', 'email', 'username'];
  }
}
