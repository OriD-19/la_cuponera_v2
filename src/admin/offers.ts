import { OfferState, PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import { validator as zValidator } from 'hono-openapi/zod';
import { rejectOfferSchema } from '../../schemas/offers';
import { Variables } from '../../schemas/jwtVariables';

// prefix: /api/admin/v1/offers
const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

app.patch(
    "/:offerId/approve",
    async c => {
        const offerId = c.req.param('offerId');

        const offer = await prisma.offer.findUnique({
            where: {
                id: parseInt(offerId),
            },
        });

        if (!offer) {
            return c.json({
                message: "offer not found",
            }, 404);
        }

        if (offer.offerState !== OfferState.PENDING) {
            return c.json({
                message: "offer is not pending",
            }, 400);
        }

        // update register in prisma
        await prisma.offer.update({
            where: {
                id: parseInt(offerId),
            },
            data: {
                offerState: OfferState.APPROVED,
                approvedAt: new Date(),
            },
        });

        return c.json({
            message: "offer accepted",
            offerId,
        })
    });

app.patch(
    "/:offerId/reject",
    zValidator('json', rejectOfferSchema),
    async c => {
        const validated = c.req.valid('json');
        const offerId = c.req.param('offerId')!;

        const offer = await prisma.offer.findUnique({
            where: {
                id: parseInt(offerId),
            },
        });

        if (!offer) {
            return c.json({
                message: "offer not found",
            }, 404);
        }

        if (offer.offerState !== OfferState.PENDING) {
            return c.json({
                message: "offer is not pending",
            }, 400);
        }

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

// get all pending offers
app.get(
    '/pending',
    async c => {
        const offers = await prisma.offer.findMany({
            where: {
                offerState: OfferState.PENDING,
            },
        });

        return c.json(offers);
    });

app.get(
    '/',
    async c => {
        const enterpriseId = c.get('jwtPayload').id;
        const offset = c.req.query("offset") ?? "0";
        const limit = c.req.query("limit") ?? "10";

        const totalOffers = await prisma.offer.count({
            where: {
                enterpriseId: parseInt(enterpriseId),
            }
        });

        const numPages = Math.ceil(totalOffers / parseInt(limit));

        const offers = await prisma.offer.findMany({
            skip: parseInt(offset),
            take: parseInt(limit),
            where: {
                enterpriseId: parseInt(enterpriseId),
            }
        });

        const basePath = c.req.url.split("?")[0];

        return c.json({
            offers: offers,
            next: (
                parseInt(offset) + parseInt(limit) >= totalOffers
                    ? null
                    : `${basePath}?offset=${parseInt(offset) + parseInt(limit)}&limit=${limit}`
            ),
            prev: (
                parseInt(offset) - parseInt(limit) < 0
                    ? null
                    : `${basePath}?offset=${parseInt(offset) - parseInt(limit)}&limit=${limit}`
            ),
            numPages: numPages,
        });
    });

export default app;