export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface AuthUser {
  userId: string;
  email: string;
}

export interface GetAllUsersResponse {
  users: IUser[];
}
