require('dotenv').config({ silent: true });

const Koa = require('koa');
const mount = require('koa-mount');
const app = new Koa();
const serve = require('koa-static');
const path = require('path');
const createReadStream = require('fs').createReadStream;
const EmailService = require('./services/email.service');
const UsersService = require('./services/users.servise');
const DatabaseService = require('./services/database.service');
const ParseService = require('./services/parser.service');
const GoogleSheetToJSON = require('./services/google-api.service');

const graphqlHttp = require('koa-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

app.use(serve(path.join(__dirname, '/public')));

// TODO need to move routes to separated files;
const Router = require('koa2-router');
const router = Router();

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

// probably need to use koa-views or something... but if we have only one index.html.....
router.get('/admin-panel', ctx => {
  const reader = createReadStream(path.join(__dirname, '/public/index.html'));
  return new Promise(resolve => {
    reader.on('data', chunk => {
      ctx.type = 'html';
      ctx.body = chunk.toString();
      resolve();
    });
  });
});

/* admin panel  */
// TODO: need to add middleware to check permission;
router.get('/admin/api/execute-sql', ctx => {
  return DatabaseService.runSql(ctx.query.query)
    .then(result => {
      ctx.status = 200;
      ctx.body = { result };
    })
    .catch(err => (ctx.body = err));
});

router.get('/admin/api/parse', ctx => {
  const { CLIENT_EMAIL, PRIVATE_KEY, SPREAD_SHEET_ID } = process.env;
  const gSheetToJSON = new GoogleSheetToJSON({ CLIENT_EMAIL, PRIVATE_KEY });
  if (!CLIENT_EMAIL || !PRIVATE_KEY || !SPREAD_SHEET_ID) {
    const undefinedEnvVars = Object.keys(process.env).filter(
      key => !process.env[key]
    );
    ctx.body = {
      message: `Next env vars is not defined ${undefinedEnvVars.join('; ')}`
    };
    ctx.throw(403, {
      message: `Next env vars is not defined ${undefinedEnvVars.join('; ')}`
    });
  }

  return gSheetToJSON
    .getJson({
      spreadsheetId: SPREAD_SHEET_ID,
      range: 'Список власників автомобілів!A2:I1000'
    })
    .then(
      ({ data, status, statusText }) => {
        ctx.status = status;
        ctx.statusText = statusText;
        ctx.body = {
          text: 'success',
          data: new ParseService().normalizeRows(data.values),
          vars: { CLIENT_EMAIL, PRIVATE_KEY, SPREAD_SHEET_ID }
        };
      },
      err => {
        ctx.body = err;
        ctx.throw(501, err);
      }
    )
    .catch(err => {
      ctx.throw(401, err);
    });
});

/* APIs */
router.get('/api/send-email/:car_number', ctx => {
  return UsersService.getUserByNumber(ctx.params.car_number)
    .then(user =>
      EmailService.sendEmail({
        to: user.email,
        subject: 'test subject',
        html: '<div>Test html...</div>'
      })
    )
    .then(() => (ctx.body = { status: 'ok' }))
    .catch(() => {});
});

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
