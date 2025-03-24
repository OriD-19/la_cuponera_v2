import { Hono } from 'hono';
import { jwt } from "hono/jwt";
import { Variables } from '../schemas/jwtVariables';

import "dotenv/config";
import { authorization, Role } from '../middleware/authorization';
import { validator as zValidator } from 'hono-openapi/zod';
import { createOfferRequestSchema, updateOfferRequestSchema } from '../schemas/offers';
import { CouponState, OfferState, PrismaClient } from '@prisma/client';
import { describeRoute } from 'hono-openapi';
import { buyCouponDocs, createOfferDocs, deleteOfferDocs, getOfferDocs, getOffersDocs, getOffersEnterpriseDocs, updateOfferRequestDocs } from '../documentation/offers.docs';

// prefix: /api/v1/offers
const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

app.post(
    "/enterprise",
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
    '/enterprise/:offerId',
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
                    offerRejectedReason: null,
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


// list all offers, only for enterprises
app.get(
    "/enterprise",
    describeRoute(getOffersEnterpriseDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.ENTERPRISE),
    async c => {
        const enterpriseId = c.get('jwtPayload').id;

        //add pagination
        const offset = c.req.query("offset") ?? "0";
        const limit = c.req.query("limit") ?? "10";

        const offers = await prisma.offer.findMany({
            skip: parseInt(offset),
            take: parseInt(limit),
            where: {
                enterpriseId: parseInt(enterpriseId),
            },
        });

        const basePath = c.req.url.split("?")[0];
        console.log(basePath);

        return c.json({
            offers: offers,
            next: `${basePath}?offset=${parseInt(offset) + parseInt(limit)}&limit=${limit}`,
        });
    });

app.delete(
    '/enterprise/:offerId',
    describeRoute(deleteOfferDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.ENTERPRISE),
    async c => {

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

        await prisma.offer.delete({
            where: {
                id: parseInt(offerId),
            },
        });

        return c.json({
            message: "offer deleted",
        });
    });

// for the public URL, only list approved offers within the valid date range
app.get(
    "/",
    describeRoute(getOffersDocs),
    async c => {

        const offset = c.req.query("offset") ?? "0";
        const limit = c.req.query("limit") ?? "10";

        const offers = await prisma.offer.findMany({
            skip: parseInt(offset),
            take: parseInt(limit),
            where: {
                offerState: OfferState.ACTIVE,
                validFrom: {
                    lte: new Date(),
                },
                validUntil: {
                    gte: new Date(),
                },
            }
        });

        const basePath = c.req.url.split("?")[0];

        return c.json({
            offers: offers,
            next: `${basePath}?offset=${parseInt(offset) + parseInt(limit)}&limit=${limit}`,
        });
    }
);

// for all users
app.get(
    '/:offerId',
    describeRoute(getOfferDocs),
    async c => {

        const offerId = c.req.param('offerId');

        const offer = await prisma.offer.findFirst({
            where: {
                id: parseInt(offerId),
            },
            include: {
                enterprise: true,
            }
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

// buy an offer/generate a coupon
app.post(
    "/:offerId/buy",
    describeRoute(buyCouponDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.CLIENT),
    async c => {

        const clientId = parseInt(c.get('jwtPayload').id);
        const offerId = c.req.param('offerId');

        const offer = await prisma.offer.findFirst({
            where: {
                id: parseInt(offerId),
            },
            include: {
                enterprise: true,
            }
        });

        if (!offer) {
            return c.json({
                message: "offer not found",
            }, 404);
        }

        if (offer.quantityLimit) {
            if (offer.quantityLimit <= 0) {
                return c.json({
                    message: "offer out of stock",
                }, 400);
            }
        }

        // generate a random 7-digit number
        const randNum = Math.floor(1000000 + Math.random() * 9000000);

        const couponCode = offer.enterprise.enterpriseCode + randNum.toString();

        const coupon = await prisma.coupon.create({
            data: {
                code: couponCode,
                couponState: CouponState.VALID,
                clientId: clientId,
                offerId: parseInt(offerId),
            },
        });

        if (offer.quantityLimit) {
            await prisma.offer.update({
                where: {
                    id: parseInt(offerId),
                },
                data: {
                    quantityLimit: {
                        decrement: 1,
                    },
                },
            });
        }

        return c.json({
            message: "coupon bought",
            couponCode: coupon.code,
        }, 201);
    });

export default app;