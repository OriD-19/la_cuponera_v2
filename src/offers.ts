import { Hono } from 'hono';
import { jwt } from "hono/jwt";
import { Variables } from '../schemas/jwtVariables';

import "dotenv/config";
import { authorization, Role } from '../middleware/authorization';
import { validator as zValidator } from 'hono-openapi/zod';
import { createOfferRequestSchema, getOffersResponseSchema, updateOfferRequestSchema } from '../schemas/offers';
import { OfferState, PrismaClient } from '@prisma/client';
import { describeRoute } from 'hono-openapi';
import { createOfferDocs, getOfferDocs, getOffersDocs, updateOfferRequestDocs } from '../documentation/offers.docs';

// prefix: /api/v1/offers
const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

app.post(
    "/create",
    describeRoute(createOfferDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.ENTERPRISE),
    zValidator("json", createOfferRequestSchema),
    async c => {

        const validated = c.req.valid("json");
        const enterpriseId = c.get('jwtPayload').id;

        try {
            await prisma.offer.create({
                data: {
                    title: validated.title,
                    description: validated.description,
                    originalPrice: validated.originalPrice,
                    discountPrice: validated.discountPrice,
                    validFrom: validated.validFrom,
                    validUntil: validated.validUntil,
                    quantityLimit: validated.quantityLimit,
                    enterpriseId: parseInt(enterpriseId),

                    // pending state by default
                    offerState: OfferState.PENDING,
                },
            });

        } catch (err) {
            return c.json({
                message: "could not create offer with provided information",
            }, 400);
        }

        return c.json({
            message: "offer created successfully, waiting for approval",
        }, 201);
    });

app.patch(
    '/:offerId',
    describeRoute(updateOfferRequestDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!
    }),
    authorization(Role.ENTERPRISE),
    zValidator('json', updateOfferRequestSchema),
    async c => {

        const validated = c.req.valid('json');
        const enterpriseId = c.get('jwtPayload').id;
        const offerId = c.req.param('offerId');

        const offer = await prisma.offer.findFirst({
            where: {
                id: parseInt(offerId),
                enterpriseId: parseInt(enterpriseId),
            },
        });

        if (!offer) {
            return c.json({
                message: "offer not found",
            }, 404);
        }

        try {
            await prisma.offer.update({
                where: {
                    id: parseInt(offerId),
                },
                data: {
                    title: validated.title,
                    description: validated.description,
                    originalPrice: validated.originalPrice,
                    discountPrice: validated.discountPrice,
                    validFrom: validated.validFrom,
                    validUntil: validated.validUntil,
                    quantityLimit: validated.quantityLimit,

                    // reset state to pending
                    offerState: OfferState.PENDING,
                },
            });

        } catch (err) {
            return c.json({
                message: "could not update offer with provided information",
            }, 400);
        }

        return c.json({
            message: "offer updated successfully",
        });
    });

app.get(
    "/",
    describeRoute(getOffersDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.ENTERPRISE),
    async c => {
        const enterpriseId = c.get('jwtPayload').id;

        const offers = await prisma.offer.findMany({
            where: {
                enterpriseId: parseInt(enterpriseId),
            },
        });

        return c.json({
            offers: offers,
        });
    }
);

// for all users
app.get(
    '/:id',
    describeRoute(getOfferDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!
    }),
    async c => {

        const offerId = c.req.param('id');

        const offer = await prisma.offer.findFirst({
            where: {
                id: parseInt(offerId),
            },
        });

        if (!offer) {
            return c.json({
                message: "offer not found",
            }, 404);
        }

        return c.json({
            offer: offer,
        });
    });

export default app;