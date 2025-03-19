import { Hono } from 'hono';
import login from './login';
import offers from './offers';

// for administrator only
const adminApp = new Hono().basePath("/api/admin/v1");

const app = new Hono().basePath("/api/v1");

app.route("/login", login);
app.route("/offers", offers);

app.get("/", c => {
    return c.json("Hello world!");
})

export default app;
