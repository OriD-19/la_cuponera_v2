import { Hono } from 'hono';
import { jwt } from "hono/jwt";
import { Variables } from '../schemas/jwtVariables';

const app = new Hono<{ Variables: Variables }>();

app.use('/*', jwt({
    secret: "it-is-very-secret",
}));

app.get("/page", (c) => {
    const { role, name } = c.get("jwtPayload");
    return c.json({
        message: `Hello, ${name}. You are a ${role} type of user`,
    });
});

export default app;