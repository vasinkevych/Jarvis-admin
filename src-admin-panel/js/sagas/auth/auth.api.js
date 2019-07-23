import auth0 from 'auth0-js';

export const auth0Client = new auth0.WebAuth({
  // the following three lines MUST be updated
  domain: process.env.AUTH0_DOMAIN,
  audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  clientID: process.env.AUTH0_CLIENT_ID,
  redirectUri: `${window.location.origin}/`,
  responseType: 'token id_token'
  // scope: 'openid profile email'
});

export function login({ username, password }) {
  return new Promise((resolve, reject) => {
    console.log('lsakdasldkj');
    auth0Client.client.login(
      {
        realm: 'Username-Password-Authentication', //connection name or HRD domain
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        scope: 'read:order write:order',
        username,
        password
      },
      (err, authResult) => {
        if (err) {
          return reject(err);
        }
        resolve(authResult);
        if (authResult && authResult.idToken && authResult.accessToken) {
          this.setToken(authResult.accessToken, authResult.idToken);
          window.location = window.location.origin; //redirect to main page
        }
      }
    );
  });
}

export function handleAuthentication() {
  return new Promise((resolve, reject) => {
    auth0Client.parseHash((err, authResult) => {
      if (err) return reject(err);
      if (!authResult || !authResult.idToken) {
        return reject(err);
      }
      const idToken = authResult.idToken;
      const profile = authResult.idTokenPayload;
      // set the time that the id token will expire at
      const expiresAt = authResult.idTokenPayload.exp * 1000;
      resolve({
        authenticated: true,
        idToken,
        profile,
        expiresAt
      });
    });
  });
}

export function signIn() {
  auth0Client.authorize();
}

export function signOut() {
  auth0Client.logout({
    returnTo: 'http://localhost:3000',
    clientID: process.env.AUTH0_CLIENT_ID
  });
}
