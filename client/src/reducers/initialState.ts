export const userState = {
  user_name: undefined,
  email: undefined,
  avatar: "",
  biography: "",
}

const initialState = {
  user: userState,
  token: localStorage.getItem('token') || null,
};

export default initialState;
