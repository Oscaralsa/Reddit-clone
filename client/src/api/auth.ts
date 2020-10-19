import { ISignUpData } from "../interfaces/global_interfaces";

export async function signUpApi(user: ISignUpData) {
  const url = `${process.env.REACT_APP_API_URL}/sign-up`

  const userTemp = {
    ...user,
    email: user.email.toLowerCase()
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