import { Hono } from 'hono';
import login from './login';
import offers from './offers';
import adminOffers from './admin/offers';
import register from './register';
import { Variables } from '../schemas/jwtVariables';
import { apiReference } from "@scalar/hono-api-reference";
import { openAPISpecs } from 'hono-openapi';
import { authorization, Role } from '../middleware/authorization';

// for administrator only
const adminApp = new Hono().basePath("/api/admin/v1");
// authorization middleware for the administrator api
adminApp.use(authorization(Role.ADMIN));

const app = new Hono<{ Variables: Variables }>().basePath("/api/v1");

app.route("/login", login);
app.route("/offers", offers);
app.route("/register", register);

adminApp.route("/offers", adminOffers);

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
