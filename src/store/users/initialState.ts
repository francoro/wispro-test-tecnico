export interface IUserBody {
  name: string;
  lastName: string;
  email: string;
  id: string;
  creationDate: string;
  address: string;
}

export interface IUser {
  users: IUserBody[];
  isFetching: boolean;
  error: boolean;
}

export default {
  users: [],
  isFetching: false,
  error: false,
} as IUser;
