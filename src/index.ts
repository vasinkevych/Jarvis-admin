import { Context, Next } from 'koa';
import { resolve } from 'path';
const Koa = require('koa');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const serve = require('koa-static');
const cors = require('@koa/cors');
const loggingService = require('./services/logging.service');
const logger = require('koa-logger');
const stripAnsi = require('strip-ansi');
const winston = require('winston');
// const router = require('./routes');

loggingService.initializeLogger();

const graphqlHttp = require('koa-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const checkJwt = require('./services/auth');
const https = require('https');
const configs = require('./configs');

app.use(bodyParser());
app.use(serve(resolve(__dirname, '/public')));
app.use(cors());
app.use(async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err: Error) => {
  winston.log('error', err);
});
app.use(checkJwt());

app.use(logger((str: string) => winston.log('info', stripAnsi(str))));

// TODO need to move routes to separated files;

// require our external routes and pass in the router

const delayInMinutes = 20;

setInterval(function() {
  // TODO add logger action here
  https.get(configs.ADMIN_URL);
}, 1000 * 60 * delayInMinutes);

app.use(
  mount(
    '/graphql',
    graphqlHttp({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true
    })
  )
);

// app.use(router);

const server = app.listen(configs.PORT);

// increased timeout to 10min as /api/parse is not able to complete in 2min
server.timeout = 10 * 60 * 1000;

console.log('listen ', 3000);
