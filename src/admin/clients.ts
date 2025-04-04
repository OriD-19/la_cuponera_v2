import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { Variables } from 'hono/types';
import { PrismaClient } from '@prisma/client';
import "dotenv/config";
import { describeRoute } from 'hono-openapi';
import { deleteClientsRequestDocs, getAllClientsRequestDocs, getClientDetailsResponseDocs } from '../../documentation/clients.docs';
import { authorization } from '../../middleware/authorization';

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

app.get(
    "/",
    describeRoute(getAllClientsRequestDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!
    }),
    async c => {
        const clients = await prisma.client.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
                Coupons: {
                    select: {
                        code: true,
                        couponState: true,
                        createdAt: true,
                        updatedAt: true,
                        offerDetails: {
                            select: {
                                id: true,
                                title: true,
                                description: true,
                                discountPrice: true,
                                originalPrice: true,
                                validFrom: true,
                                validUntil: true,
                                createdAt: true,
                                updatedAt: true,
                            }
                        }
                    },
                }
            }
        });

        return c.json(
            { clients }
        );
    }
)

app.get(
    '/:clientId',
    describeRoute(getClientDetailsResponseDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!
    }),
    async c => {
        const clientId = c.req.param('clientId');
        const client = await prisma.client.findUnique({
            where: {
                id: parseInt(clientId),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
                Coupons: {
                    select: {
                        code: true,
                        couponState: true,
                        createdAt: true,
                        updatedAt: true,
                        offerDetails: {
                            select: {
                                id: true,
                                title: true,
                                description: true,
                                discountPrice: true,
                                originalPrice: true,
                                validFrom: true,
                                validUntil: true,
                                createdAt: true,
                                updatedAt: true,
                            }
                        }
                    },
                }
            }
        });

        return c.json(
            { client }
        );
    }
)

export default app;