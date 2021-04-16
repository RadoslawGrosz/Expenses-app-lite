const userReducerDefaultState = {
  id: undefined,
  username: "",
  password: "",
  role: "",
};

const userReducer = (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
