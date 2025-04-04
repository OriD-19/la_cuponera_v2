import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import login from './login';
import offers from './offers';
import adminOffers from './admin/offers';
import register from './register';
import employees from './employees';
import adminClients from './admin/clients';
import adminEnterprises from './admin/enterprises';
import coupons from "./coupons";
import adminCategories from './admin/categories';
import categories from './categories';
import profile from './profile';
import enterprises from './enterprises';
import { Variables } from '../schemas/jwtVariables';
import { apiReference } from "@scalar/hono-api-reference";
import { openAPISpecs } from 'hono-openapi';
import { authorization, Role } from '../middleware/authorization';

import "dotenv/config";
import { jwt } from 'hono/jwt';

// for administrator only
const adminApp = new Hono().basePath('/admin')
adminApp.use(logger());
adminApp.use(cors());

// authorization middleware for the administrator api
adminApp.use("/*", jwt({ secret: process.env.TOKEN_SECRET! }), authorization(Role.ADMIN));

const app = new Hono<{ Variables: Variables }>().basePath("/api/v1");
app.use(logger());
app.use(cors());

app.route("/login", login);
app.route("/offers", offers);
app.route("/register", register);
app.route("/coupons", coupons);
app.route('/categories', categories);
app.route('/profile', profile);
app.route('/enterprises', enterprises);

// protect the route of employees only for an enterprise
app.route('/employees', employees);

adminApp.route("/offers", adminOffers);
adminApp.route("/clients", adminClients);
adminApp.route("/enterprises", adminEnterprises);
adminApp.route("/categories", adminCategories);

app.route('/', adminApp);

app.get("/", c => {
    return c.json("Hello world!");
});

app.get("/openapi", openAPISpecs(app, {
    documentation: {
        info: {
            title: "La Cuponera API",
            description: "API for managing offers",
            version: "1.0.0",
        },
        components: {
            securitySchemes:
            {
                bearerAuth:
                {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
            {
                url: "https://apiv1.lacuponera.store",
                description: "Production server",
            }
        ],
    },
}));

app.get("/docs", apiReference({
    theme: 'saturn',
    spec: { url: '/api/v1/openapi' },
}));

export default app;
