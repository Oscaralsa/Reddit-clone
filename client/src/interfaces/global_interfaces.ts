export interface Route {
  path: string,
  exact: boolean,
  page: () => JSX.Element
}

export interface ISignUpData {
  user_name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  user_name: string;
  password: string;
}

export interface ISetUser {
  setUser: (user: any, token: string) => {
    type: string;
    payload: {
        user: any;
        token: any;
    };
}
}

export interface IDispatch {
  dispatch: (arg0: { type: string; payload: any; }) => void
}