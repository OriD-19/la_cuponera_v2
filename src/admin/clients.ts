import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { Variables } from 'hono/types';
import { PrismaClient } from '@prisma/client';
import "dotenv/config";
import { describeRoute } from 'hono-openapi';
import { deleteClientsRequestDocs } from '../../documentation/clients.docs';

// prefix: /api/admin/v1/clients
const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

app.delete(
    "/:clientId",
    describeRoute(deleteClientsRequestDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!
    }),  
    async c => {
        const clientId = c.req.param('clientId');

        await prisma.client.delete({
            where: {
                id: parseInt(clientId),
            }
        });

        return c.json(
            { message: "Client deleted successfully" }
        );
    });

export default app;