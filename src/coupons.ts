import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import "dotenv/config";
import { jwt } from 'hono/jwt';
import { Variables } from 'hono/types';
import { describeRoute } from 'hono-openapi';
import { getCouponDocs, getCouponsDocs, redeemCouponDocs } from '../documentation/coupons.docs';
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
    "/:couponCode",
    describeRoute(getCouponDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.CLIENT),
    async c => {

        const clientId = parseInt(c.get('jwtPayload').id);
        const couponCode = c.req.param('couponCode');

        const coupon = await prisma.coupon.findUnique({
            where: {
                code: couponCode,
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


// only employees can redeem a coupon
app.post(
    '/:couponCode/redeem', 
    describeRoute(redeemCouponDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.EMPLOYEE),
    async c => {
        const couponCode = c.req.param('couponCode');

        const employeeId = parseInt(c.get('jwtPayload').id);

        const employee = await prisma.employee.findFirst({
            where: {
                id: employeeId,
            },
        });

        if (!employee) {
            return c.json({
                message: "employee not found",
            }, 404);
        }

        const coupon = await prisma.coupon.findFirst({
            where: {
                code: couponCode,
            },
            include: {
               offerDetails: true, 
            }
        });

        if (!coupon) {
            return c.json({
                message: "coupon not found",
            }, 404);
        }

        if (coupon.offerDetails.enterpriseId !== employee.enterpriseId) {
            return c.json({
                message: "you are not authorized to redeem this coupon",
            }, 403);
        }

        await prisma.coupon.update({
            where: {
                id: parseInt(couponCode),
            },
            data: {
                couponState: 'USED',
            },
        });

        return c.json({
            message: "coupon redeemed successfully",
        });
    }
)

export default app;