export const getBaseUrl = () => {
  return `http://${location.hostname}${(location.port ? ':3000' : '')}`;
};
