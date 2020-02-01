/* eslint-disable no-undef */
import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: environment.AUTH0_DOMAIN,
      clientID: environment.AUTH0_CLIENT_ID,
      redirectUri: `${window.location.origin}/callback`,
      audience: environment.AUTH0_AUDIENCE,
      responseType: 'token',
      scope: 'openid email'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.accessToken = 'accessToken';
  }

  login() {
    this.auth0.authorize();
  }

  getIdToken() {
    return JSON.parse(localStorage.getItem(this.accessToken));
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.accessToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  setSession(authResult) {
    localStorage.setItem(
      this.accessToken,
      JSON.stringify(authResult.accessToken)
    );
  }

  logout() {
    localStorage.setItem(this.accessToken, JSON.stringify(null));
    this.auth0.logout({
      returnTo: window.location.origin,
      clientID: environment.AUTH0_CLIENT_ID
    });
  }

  silentAuth() {
    if (this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.accessToken);
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }

  isAuthenticated() {
    return !!JSON.parse(localStorage.getItem(this.accessToken));
  }
}

const auth = new Auth();

export default auth;
