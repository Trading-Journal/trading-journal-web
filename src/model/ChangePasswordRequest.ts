export interface ChangePasswordRequest {
  hash: string;
  email: string;
  password: string;
  confirmPassword: string;
}
