import { DescribeRouteOptions } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from 'zod';
import { CouponWithPartialRelationsSchema } from "../prisma/generated/zod";

export const getCouponsDocs: DescribeRouteOptions = {
    description: "Get all coupons available in the system",
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: resolver(z.array(CouponWithPartialRelationsSchema)),
                },
            },
        },
    },
};

export const getCouponDocs: DescribeRouteOptions = {
    description: "Get a coupon by its ID",
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: resolver(CouponWithPartialRelationsSchema),
                },
            },
        },
        404: {
            description: "Coupon not found",
        },
    },
};