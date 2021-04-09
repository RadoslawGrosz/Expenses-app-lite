/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

class AuthenticationService {
  async logIn(e) {
    let token = sessionStorage.getItem('token');

    if (e) {
      e.preventDefault();
      const { login, password } = e.target.elements;
      token = this.createBasicAuthToken(login.value, password.value);
    }

    let user = {};
    const url = 'http://localhost:8080/api/user/login';

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    try {
      const res = await axios.get(url, { headers });
      this.setAuthenticationSettings(token);
      user = res.data;
    } catch (err) {
      console.error('nie udane logowanie');
    }

    return user;
  }

  setAuthenticationSettings = (token) => {
    sessionStorage.setItem('token', token);
    // this.setupAxiosInterceptors(token);
  };

  clearAuthenticationSettings = () => {
    sessionStorage.clear('token');
    // this.setupAxiosInterceptors();
  };

  isUserLoggedIn = () => sessionStorage.getItem('token');

  createBasicAuthToken = (login, password) =>
    `Basic ${btoa(`${login}:${password}`)}`;

  setupAxiosInterceptors = (token) => {
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
