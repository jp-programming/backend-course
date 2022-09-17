const logger = require('../lib/logger');
const Router = require('koa-router');
const graphql = require('../controllers/graphqlController');

const graphqlRouter = new Router({
    prefix: '/'
});

graphqlRouter.use('/graphql', async (ctx, next) => {
    logger('info', `${ctx.method} ${ctx.request.originalUrl}`);
    await next();
}, graphql);

module.exports = graphqlRouter;