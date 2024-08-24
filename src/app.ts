import Koa from 'koa'
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import serve from 'koa-static';
import path from 'path';
import session from 'koa-session';
import router from './router';
import cors from '@koa/cors';
// import { port } from './config/appConfig';
// import { setupEnv } from './util/helper


// setupEnv';

const app = new Koa();

app.keys = ['timeSecret'];

app.use(session({key: 'mySession'}, app,),);

app.use(cors())

app.use(bodyParser())

app.use(logger());

app.use(serve(path.join(__dirname, '../build')))

app.use(router.routes()).use(router.allowedMethods());


function launch() {
    const port = 8080
    app.listen(port)
    console.log(`Backend Server running on port ${port}`)
}

export default launch;