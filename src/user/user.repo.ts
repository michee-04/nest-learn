import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IUserModel } from 'src/schema/types';

export class UserRepository extends BaseRepository<IUserModel> {
  constructor(model: Model<IUserModel>) {
    super(model);
  }
}
