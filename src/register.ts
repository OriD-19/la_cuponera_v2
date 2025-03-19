import { Hono } from 'hono';
import { Variables } from '../schemas/jwtVariables';
import { zValidator } from '@hono/zod-validator';
import { registerClientRequestSchema } from '../schemas/register';

import { PrismaClient } from '@prisma/client';

const app = new Hono<{ Variables: Variables }>().basePath("/register");
const prisma = new PrismaClient();

app.post("/client", zValidator('json', registerClientRequestSchema), async c => {

    const validated = c.req.valid('json');

    const client = await prisma.client.create({
        data: {
            user: {
                create: {
                    firstName: validated.firstName,
                    lastName: validated.lastName,
                    email: validated.email,
                    password: validated.password
                }
            },
            DUI: validated.DUI,
            phone: validated.phone,
        }
    });

    return c.json("Hello world!", 201);
})