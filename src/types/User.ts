export interface UserCredentails {
  login: string;
  password: string;
}

export interface User {
  id: string | undefined;
  username: string;
  password: string;
  role: string;
}
