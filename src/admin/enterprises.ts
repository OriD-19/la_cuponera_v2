import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { getEnterprisesDocs, getEnterpriseDocs } from '../../documentation/enterprises.docs';
import "dotenv/config";
import { jwt } from 'hono/jwt';
import { PrismaClient } from '@prisma/client';

// prefix: /api/admin/v1/enterprises
const app = new Hono();
const prisma = new PrismaClient();

app.get(
    "/",
    describeRoute(getEnterprisesDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    async c => {

        const enterprises = await prisma.enterprise.findMany({
            orderBy: {
                enterpriseCode: 'asc',
            },
            include: {
                Offer: true,
            }
        });

        return c.json(enterprises);
    });

app.get(
    "/:enterpriseId",
    describeRoute(getEnterpriseDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    async c => {

        const enterpriseId = c.req.param('enterpriseId');

        const enterprise = await prisma.enterprise.findUnique({
            where: {
                id: parseInt(enterpriseId),
            },
            include: {
                Employee: true,
                Offer: true,
            }
        });

        return c.json(enterprise);
    });

export default app;