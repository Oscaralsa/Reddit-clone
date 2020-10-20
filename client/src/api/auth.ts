import { ISignUpData, ILoginData } from "../interfaces/global_interfaces";
import jwtDecode from "jwt-decode";

export async function signUpApi(user: ISignUpData) {
  const url = `${process.env.REACT_APP_API_URL}/sign-up`

  const userTemp = {
    ...user,
    email: user.email.toLowerCase(),
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
    if (response.status === 201){
      return "Done"
    }
    return response.text();
  } catch (err) {
    return err;
  }
}

export async function loginApi(user: ILoginData) {
  const url = `${process.env.REACT_APP_API_URL}/login`

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

export function isUserLogged(): string {
  const token = getTokenApi();

  if(!token){
    logoutApi();
    return "";
  }
  if(isExpired(token)) logoutApi()

  return jwtDecode(token)
}

function isExpired(token: string) {
  const { exp } = jwtDecode(token);
  const expired = exp * 1000;
  const timeout = expired - Date.now();

  if (timeout < 0){
    return true;
  }

  return false;

}