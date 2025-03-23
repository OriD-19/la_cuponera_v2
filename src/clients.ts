import { Hono } from 'hono';

import "dotenv/config";

// prefix: /api/v1/clients
const app = new Hono();

app.patch("/")