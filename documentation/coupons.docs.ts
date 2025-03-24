import { DescribeRouteOptions } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from 'zod';
import { CouponWithRelationsSchema } from "../prisma/generated/zod";

export const getCouponsDocs: DescribeRouteOptions = {
    description: "Get all coupons available in the system",
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: resolver(z.array(CouponWithRelationsSchema)),
                },
            },
        },
    },
};

export const getCouponDocs: DescribeRouteOptions = {
    description: "Get a coupon by its ID",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
        param: z.object({ couponId: z.string() })
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: resolver(CouponWithRelationsSchema),
                },
            },
        },
        404: {
            description: "Coupon not found",
        },
    },
};

export const redeemCouponDocs: DescribeRouteOptions = {
    description: "Redeem a coupon",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
        param: z.object({ couponId: z.string() })
    },
    responses: {
        200: {
            description: "Coupon redeemed successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "coupon redeemed successfully",
                            },
                        },
                    },
                }
            },
        },
        403: {
            description: "You are not authorized to redeem this coupon",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "you are not authorized to redeem this coupon",
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: "Coupon not found",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "coupon not found",
                            },
                        },
                    },
                },
            },
        },
    },
};