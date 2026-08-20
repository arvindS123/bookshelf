export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}