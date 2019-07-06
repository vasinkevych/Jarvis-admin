const location = window.location;

export const getBaseUrl = () => {
  return `${location.protocol}//${location.hostname}${
    location.port ? ':3000' : ''
  }`;
};

export const API = {
  USERS: '/admin/api/parse'
};
