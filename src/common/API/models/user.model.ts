export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface GetAllUsersResponse {
  users: IUser[];
}
