// src/types/auth.ts
export interface AuthUser {
  id: string;
  databaseId: number;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginResult {
  authToken: string;
  refreshToken: string;
  user: AuthUser;
}
