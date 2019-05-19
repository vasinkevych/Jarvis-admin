export const getBaseUrl = () => {
  return `${location.protocol}//${location.hostname}${
    location.port ? ':3000' : ''
  }`;
};
