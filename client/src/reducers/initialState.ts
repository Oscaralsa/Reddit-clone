const initialState = {
  user: {
    user_name: undefined,
    email: undefined,
    avatar: "",
    biography: "",
  },
  token: localStorage.getItem('token') || null,
};

export default initialState;
