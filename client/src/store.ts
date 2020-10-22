import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialStore = {
  token: localStorage.getItem('token') || null,
  user: {
    user_name: undefined,
    email: undefined,
    avatar: "",
    biography: "",
  },
};

export const store = createStore(
  rootReducer,
  initialStore,
  applyMiddleware(thunk.withExtraArgument({  })),
);
