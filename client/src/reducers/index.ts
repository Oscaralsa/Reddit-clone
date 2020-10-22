import {
  SET_USER,
  LOGOUT,
} from '../actions/actionTypes';

import initialState from './initialState';

export default function rootReducer(state = initialState, action: { type: any; payload: any; }) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        token: action.payload.token!,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: initialState.user,
      };
    default:
      return state;
  }
}
