import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: environment.AUTH0_DOMAIN,
      clientID: environment.AUTH0_CLIENT_ID,
      redirectUri: `${window.location.origin}/callback`,
      audience: `https://${environment.AUTH0_DOMAIN}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid email'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.idToken = 'idToken';
  }

  login() {
    this.auth0.authorize();
  }

  getIdToken() {
    return JSON.parse(localStorage.getItem(this.idToken));
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  setSession(authResult) {
    localStorage.setItem(this.idToken, JSON.stringify(authResult.idToken));
  }

  logout() {
    localStorage.setItem(this.idToken, JSON.stringify(null));
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
            localStorage.removeItem(this.idToken);
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }

  isAuthenticated() {
    return !!JSON.parse(localStorage.getItem(this.idToken));
  }
}

const auth = new Auth();

export default auth;
