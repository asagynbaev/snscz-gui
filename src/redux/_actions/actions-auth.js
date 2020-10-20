import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './action-types';

export const requestLogin = () => {
    return {
      type: LOGIN_REQUEST
    };
  };

export const receiveLogin = user => {
    return {
      type: LOGIN_SUCCESS,
      user
    };
  };

export const loginError = () => {
    return {
      type: LOGIN_FAILURE
    };
  };
