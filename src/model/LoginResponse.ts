export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  issuedAt: Date;
  user: string;
}
