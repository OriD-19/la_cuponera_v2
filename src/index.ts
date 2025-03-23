import { Hono } from 'hono';
import login from './login';
import offers from './offers';
import register from './register';
import { Variables } from '../schemas/jwtVariables';
import { apiReference } from "@scalar/hono-api-reference";
import { openAPISpecs } from 'hono-openapi';

// for administrator only
const adminApp = new Hono().basePath("/api/admin/v1");

const app = new Hono<{ Variables: Variables }>().basePath("/api/v1");

app.route("/login", login);
app.route("/offers", offers);
app.route("/register", register);

app.get("/", c => {
    return c.json("Hello world!");
})

app.get("/openapi", openAPISpecs(app, {
    documentation: {
        info: {
            title: "Offers API",
            description: "API for managing offers",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
        ],
    },
}))

app.get("/docs", apiReference({
    theme: 'saturn',
    spec: { url: '/api/v1/openapi' },
}));

export default app;
