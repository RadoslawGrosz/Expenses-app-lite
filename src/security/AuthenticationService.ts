import axios from "axios";
import { UserCredentails } from "../types/User";

class AuthenticationService {
  async logIn(userCredentails?: UserCredentails) {
    let token = sessionStorage.getItem("token");

    if (userCredentails) {
      const { login, password } = userCredentails;
      token = this.createBasicAuthToken(login, password);
    }

    let user = {};
    const url = "http://localhost:8080/api/user/login";

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const res = await axios.get(url, { headers });
      this.setAuthenticationSettings(token);
      user = res.data;
    } catch (err) {
      console.error("nie udane logowanie");
      alert("Złe hasło lub login!");
    }

    return user;
  }

  setAuthenticationSettings = (token: string | null) => {
    if (!token) return;
    sessionStorage.setItem("token", token);
    // this.setupAxiosInterceptors(token);
  };

  clearAuthenticationSettings = () => {
    sessionStorage.clear();
    // this.setupAxiosInterceptors();
  };

  isUserLoggedIn = () => sessionStorage.getItem("token");

  createBasicAuthToken = (login: string, password: string) =>
    `Basic ${btoa(`${login}:${password}`)}`;

  setupAxiosInterceptors = (token: string) => {
    axios.interceptors.request.use((config) => {
      const newConfig = config;
      if (token) {
        newConfig.headers.authorization = token;
      }
      return newConfig;
    });
  };
}

export default new AuthenticationService();
