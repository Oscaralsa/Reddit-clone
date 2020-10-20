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