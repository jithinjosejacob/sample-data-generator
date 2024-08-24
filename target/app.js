"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_static_1 = __importDefault(require("koa-static"));
const path_1 = __importDefault(require("path"));
const koa_session_1 = __importDefault(require("koa-session"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("@koa/cors"));
// import { port } from './config/appConfig';
// import { setupEnv } from './util/helper
// setupEnv';
const app = new koa_1.default();
app.keys = ['timeSecret'];
app.use((0, koa_session_1.default)({ key: 'mySession' }, app));
app.use((0, cors_1.default)());
app.use((0, koa_bodyparser_1.default)());
app.use((0, koa_logger_1.default)());
app.use((0, koa_static_1.default)(path_1.default.join(__dirname, '../build')));
app.use(router_1.default.routes()).use(router_1.default.allowedMethods());
function launch() {
    const port = 8080;
    app.listen(port);
    console.log(`Backend Server running on port ${port}`);
}
exports.default = launch;
