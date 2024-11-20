import { createBaseSchema, BaseModel } from '@nodesandbox/repo-framework';
import { IUserModel } from './types';

export const USER_MODEL_NAME = 'User';

const userSchema = createBaseSchema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    modelName: USER_MODEL_NAME,
  },
);

const UserModel = new BaseModel<IUserModel>(
  USER_MODEL_NAME,
  userSchema,
).getModel();

export { UserModel, userSchema };
