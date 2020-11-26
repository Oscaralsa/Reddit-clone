import { ISignUpData, ILoginData } from "../interfaces/global_interfaces";
import jwtDecode from "jwt-decode";

export async function signUpApi(user: ISignUpData) {
  const url = `/api/sign-up`

  const userTemp = {
    ...user,
    email: user.email.toLowerCase(),
    user_name: user.user_name.toLowerCase()
  }

  console.log(userTemp)
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userTemp)
  }

  try {
    const response = await fetch(url, params);
    if (response.status === 201){
      return "User created, please login"
    }
    return response.text();
  } catch (err) {
    return err;
  }
}

export async function loginApi(user: ILoginData) {
  const url = `/api/login`

  const userTemp = {
    ...user,
    user_name: user.user_name.toLowerCase()
  }

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userTemp)
  }

  try {
    const response = await fetch(url, params);
    if (response.status === 200){
      return response.json();
    }
    return response.text();
  } catch (err) {
    return err;
  }
}

export function setTokenApi(token: string) {
  localStorage.setItem("token", token);
}

export function getTokenApi() {
  return localStorage.getItem("token");
}

export function logoutApi() {
  localStorage.removeItem("token");
}

export function isUserLogged(): {} {
  const token = getTokenApi();

  if(!token){
    logoutApi();
    return {};
  }
  if(isExpired(token)) logoutApi()

  return getUserData(token)
}

function isExpired(token: string) {
  const { exp } = jwtDecode(token);
  const expired = exp * 1000;
  const timeout = expired - Date.now();

  return timeout < 0;

}

export function getUserData(token: (string) ){
  const { user_name, email, avatar, biography } = jwtDecode(token);

  return { user_name, email, avatar, biography };
}