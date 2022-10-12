import React from 'react';
import { LoginResponse } from '../model/LoginResponse';
import { login } from '../services/Authentication';

interface UserContextState {
  status: string;
  user?: LoginResponse;
  error: any;
}

const initialState: UserContextState = {
  status: 'idle',
  user: undefined,
  error: null,
};

const AuthStateContext = React.createContext(initialState);
const AuthDispatchContext = React.createContext({});

function reducer(currentState: UserContextState, newState: UserContextState) {
  return { ...currentState, ...newState };
}

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (!context) throw new Error('useAuthState must be used in AuthProvider');

  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (!context) throw new Error('useAuthDispatch must be used in AuthProvider');

  return context;
}

function AuthProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

async function doLogin(dispatch: any, email: string, password: string) {
  try {
    dispatch({ status: 'pending' });

    const result = await login(email, password);
    dispatch({
      status: 'resolved',
      user: result,
      error: null,
    });
  } catch (error: any) {
    dispatch({ status: 'rejected', error: error.message });
  }
}

function doLogout(dispatch: any) {
  dispatch(initialState);
}

export { AuthProvider, useAuthState, useAuthDispatch, doLogin, doLogout };