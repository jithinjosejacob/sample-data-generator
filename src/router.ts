import Router from "koa-router";

const router = new Router();

router
  .get("/", async (ctx) => {
    ctx.body = "Hello World";
  })
  .get("/test", async (ctx) => {
    ctx.body = "Hello Test";
  });


  export default router;