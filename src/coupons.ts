import { Hono } from 'hono';

// prefix: /api/v1/coupons
const app = new Hono();

app.get("/", c => {
    return c.json("Hello world!");
});