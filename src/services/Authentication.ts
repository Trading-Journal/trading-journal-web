import {
  ChangePasswordRequest,
  LoginResponse,
  RegisterRequest,
  SignUpResponse,
} from 'model';
import { config } from 'utilities';
import { readErrors } from './ErrorsReader';

const signIn = (email: string, password: string): Promise<LoginResponse> => {
  return fetch(`${config.authentication}/authentication/signin`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const errors = await readErrors(response);
        throw new Error(errors);
      }
    })
    .then((response: LoginResponse) => response);
};

const signUp = (register: RegisterRequest): Promise<SignUpResponse> => {
  return fetch(`${config.authentication}/authentication/signup`, {
    method: 'POST',
    body: JSON.stringify(register),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const errors = await readErrors(response);
        throw new Error(errors);
      }
    })
    .then((response: SignUpResponse) => response);
};

const requestChangePassword = (email: string): Promise<any> => {
  return fetch(
    `${config.authentication}/authentication/change-password/request?email=${email}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

const changePassword = (request: ChangePasswordRequest): Promise<any> => {
  return fetch(`${config.authentication}/authentication/change-password`, {
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

const verify = (hash: string): Promise<any> => {
  return fetch(`${config.authentication}/authentication/verify?hash=${hash}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

const sendVerification = (email: string): Promise<any> => {
  return fetch(
    `${config.authentication}/authentication/verify/send?email=${email}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

export {
  signIn,
  signUp,
  requestChangePassword,
  changePassword,
  verify,
  sendVerification,
};
