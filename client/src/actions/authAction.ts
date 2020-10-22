import { SET_USER } from './actionTypes';
import { logoutApi, getTokenApi, getUserData } from "../api/auth";

export const setUser = (user: any, token: any) => ({
  type: SET_USER,
  payload: {user, token},
});

export const login = () => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch(setUser(getUserData(getTokenApi()!), getTokenApi()));
};

export const logout = () => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  logoutApi()
  dispatch(setUser(null, getTokenApi()));
};
