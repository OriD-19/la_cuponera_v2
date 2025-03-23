import { Hono } from 'hono';
import { jwt } from "hono/jwt";
import { Variables } from '../schemas/jwtVariables';

import "dotenv/config";
import { authorization, Role } from '../middleware/authorization';
import { validator as zValidator } from 'hono-openapi/zod';
import { createOfferRequestSchema, getOffersResponseSchema } from '../schemas/offers';
import { OfferState, PrismaClient } from '@prisma/client';
import { describeRoute } from 'hono-openapi';
import { createOfferDocs, getOffersDocs } from '../documentation/offers.docs';

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

export default app;