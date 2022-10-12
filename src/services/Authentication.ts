import { LoginResponse } from './../model/LoginResponse';

const login = (email: string, password: string): Promise<LoginResponse> => {
  return fetch('http://localhost:8080/authentication/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const err = await response.json();
        throw new Error(err.error);
      }
    })
    .then((response: LoginResponse) => response);
};

export { login };
