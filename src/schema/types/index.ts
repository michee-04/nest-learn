import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IUser {
  name: string;
  usernam?: string;
  email: string;
  password: boolean;
}

export interface IUserModel extends IUser, IBaseModel, Document {}
