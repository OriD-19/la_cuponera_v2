import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import "dotenv/config";
import { jwt } from 'hono/jwt';
import { Variables } from 'hono/types';
import { describeRoute } from 'hono-openapi';
import { getCouponsDocs } from '../documentation/coupons.docs';
import { authorization, Role } from '../middleware/authorization';

// prefix: /api/v1/coupons
const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

// get all coupons from client
app.get(
    "/",
    describeRoute(getCouponsDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.CLIENT),
    async c => {

        const clientId = parseInt(c.get('jwtPayload').id);
        const coupons = await prisma.coupon.findMany({
            where: {
                clientId: clientId,
            },
            orderBy: {
                id: 'asc',
            },
            include: {
                offerDetails: {
                    include: {
                        enterprise: true,
                    }
                }
            }
        });

        return c.json(coupons);
    });

// get coupon details
app.get(
    "/:couponId",
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.CLIENT),
    async c => {

        const clientId = parseInt(c.get('jwtPayload').id);
        const couponId = c.req.param('couponId');

        const coupon = await prisma.coupon.findUnique({
            where: {
                id: parseInt(couponId),
                clientId: clientId,
            },
            include: {
                offerDetails: {
                    include: {
                        enterprise: true,
                    }
                }
            }
        });

        if (!coupon) {
            return c.json({
                message: "coupon not found",
            }, 404);
        }

        return c.json(coupon);
    });

export default app;