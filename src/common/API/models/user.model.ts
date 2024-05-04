export interface IUser {
  id: string;
  email: string;
  username: string;
  role: Role;
}

export interface AuthUser {
  userId: string;
  email: string;
  role: Role;
}

enum Role {
  USER,
  ADMIN,
}

export interface GetAllUsersResponse {
  users: IUser[];
}
