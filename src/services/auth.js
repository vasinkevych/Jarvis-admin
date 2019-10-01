const jwt = require('koa-jwt');
const jwksRsa = require('jwks-rsa');
const configs = require('../configs');

const verify = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${configs.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: configs.AUTH0_AUDIENCE,
  issuer: `https://${configs.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkJwt = () => async (ctx, next) => {
  // if (/^\/api\/(.*)(?:\/|$)/.test(ctx.path) || ctx.path === '/graphql') {
  if (/^\/api\/(.*)(?:\/|$)/.test(ctx.path)) {
    await verify.call(this, ctx, next)
      .catch(e => console.log('e=====', e));
  } else {
    await next();
  }
};

module.exports = checkJwt;
