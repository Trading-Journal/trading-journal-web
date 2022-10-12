import { LoginResponse } from './../model/LoginResponse';

const login = (email: string, password: string): Promise<LoginResponse> => {
  if (email === 'a.cassianoweber@gmail.com' && password === '123456') {
    const loginResponse = {
      accessToken: '123',
      refreshToken: '123',
      issuedAt: new Date(),
      user: 'user-1',
    };
    return Promise.resolve(loginResponse);
  } else {
    throw new Error('Invalid login');
  }
};

export { login };
