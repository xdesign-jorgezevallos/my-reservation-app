export interface Auth {
  user: CurentUser;
  error?: string
}

export interface CurentUser {
  userUID: string;
  email: string;
  displayName?: string;
  role: UserRoleType;
}

export type UserRoleType = "Admin" | "User";
