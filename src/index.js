const Koa = require('koa');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const serve = require('koa-static');
const cors = require('@koa/cors');
const path = require('path');
const createReadStream = require('fs').createReadStream;

const graphqlHttp = require('koa-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const checkJwt = require('./services/auth');

app.use(bodyParser());
app.use(serve(path.join(__dirname, '/public')));
app.use(cors());
app.use(checkJwt());

// TODO need to move routes to separated files;
const Router = require('koa2-router');
const router = Router();
// require our external routes and pass in the router
require('./routes')({ router });

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

app.use(router);

app.listen(process.env.PORT || 3000);

console.log('listen ', process.env.PORT || 3000);
