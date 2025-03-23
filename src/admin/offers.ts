import { OfferState, PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { validator as zValidator } from 'hono-openapi/zod';
import { rejectOfferSchema } from '../../schemas/offers';

// prefix: /api/admin/v1/offers
const app = new Hono();
const prisma = new PrismaClient();

app.patch(
    "/:offerId/approve",
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    async c => {
        const offerId = c.req.param('offerId');

        // update register in prisma
        await prisma.offer.update({
            where: {
                id: parseInt(offerId),
            },
            data: {
                offerState: OfferState.APPROVED,
            },
        });

        return c.json({
            message: "offer accepted",
            offerId,
        })
    });

app.patch(
    "/:offerId/reject",
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    zValidator('json', rejectOfferSchema),
    async c => {
        const validated = c.req.valid('json');
        const offerId = c.req.param('offerId')!;

        // update register in prisma
        await prisma.offer.update({
            where: {
                id: parseInt(offerId),
            },
            data: {
                offerState: OfferState.REJECTED,
                offerRejectedReason: validated.reason,
            },
        });

        return c.json({
            message: "offer rejected",
            offerId,
        })
    });

export default app;