import { ChangePasswordRequest } from '../model/ChangePasswordRequest';
import { LoginResponse } from './../model/LoginResponse';
import { readErrors } from './ErrorsReader';

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

const requestChangePassword = (email: string): Promise<any> => {
  return fetch(
    `http://localhost:8080/authentication/change-password/request?email=${email}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then(async (response) => {
    if (response.ok) return response;
    else {
      const err = await response.json();
      throw new Error(err.error);
    }
  });
};

const changePassword = (request: ChangePasswordRequest): Promise<any> => {
  return fetch(`http://localhost:8080/authentication/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  }).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

export { login, requestChangePassword, changePassword };
