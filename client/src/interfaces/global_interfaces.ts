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

export interface IBasicPostData {
  body: string;
  date: string;
  likes: number;
  multimedia: string;
  title: string;
  userId: string;
  _id: string;
}

export interface IUserData {
  birth_date: string;
  email: string;
  _id: string;
  ubication: string;
  user_name: string;
  avatar: string;
  biography: string;
  web_url: string;
  banner: string;
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