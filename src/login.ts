import { Hono } from 'hono';
import { sign } from "jsonwebtoken";

const app = new Hono();

app.post("/", (c) => {

    const token = sign({
        id: "123",
        role: "admin",
        email: "fernando@fernando.com"
    }, "it-is-very-secret", {
        expiresIn: "1h"
    });

    return c.json({
        message: `Hello, stranger. Please login`,
        auth_token: token
    });
});

export default app;