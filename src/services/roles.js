const axios = require('axios');
const configs = require('../configs');

/**
 * Get management token (needed for accessing roles)
 * @returns {Promise<AxiosResponse<any>>}
 */
const getManagementToken = () => {
  return axios({
    method: 'POST',
    url: `https://${configs.AUTH0_DOMAIN}/oauth/token`,
    data: {
      client_id: configs.AUTH0_MNGMNT_CLIENT_ID,
      client_secret: configs.AUTH0_CLIENT_SECRET,
      audience: configs.AUTH0_AUDIENCE,
      grant_type: 'client_credentials'
    }
  })
    .then(response => response.data.access_token)
    .catch(error => {
      console.error('error', error);
    });
};

/**
 * Get user id based on token (authorization)
 * @param authorization
 * @param token
 * @returns {Promise<{user: *, token: *}>}
 */
const getUserID = ({ authorization, token }) => {
  return axios({
    method: 'GET',
    url: `https://${configs.AUTH0_DOMAIN}/userinfo`,
    headers: {
      Authorization: authorization
    }
  }).then(response => ({ user: response.data.sub, token }));
};

/**
 * Get user roles
 * @param token
 * @param user
 * @returns {Promise<AxiosResponse<any>>}
 */
const getRoles = ({ token, user }) => {
  return axios({
    method: 'GET',
    url: `https://${configs.AUTH0_DOMAIN}/api/v2/users/${user}/roles`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => response.data);
};

const getCurrentUserRoles = ({ authorization }) => {
  return getManagementToken()
    .then(token => getUserID({ authorization, token }))
    .then(getRoles);
};

module.exports = getCurrentUserRoles;
