export const setUser = ({
  id = undefined,
  username = "",
  password = "",
  role = "",
} = {}) => ({
  type: "SET_USER",
  user: {
    id,
    username,
    password,
    role,
  },
});
