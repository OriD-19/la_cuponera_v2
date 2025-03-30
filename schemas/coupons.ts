import { CouponState } from '@prisma/client';
import { z } from 'zod';

import 'zod-openapi/extend';

export const getCouponDetailsResponseSchema = z.object({
    coupon: z.object({
        id: z.number(),
        code: z.string(),
        validFrom: z.date(),
        validUntil: z.date(),
        quantityLimit: z.number().nullable(),
        state: z.nativeEnum(CouponState),
        offerId: z.number(), // store this as an ID and make another query to this endpoint if necessary
        offer: z.object({
            id: z.number(),
            title: z.string(),
            originalPrice: z.number(),
            discountPrice: z.number(),
            enterprise: z.object({
                id: z.number(),
                name: z.string(),
                email: z.string(),
                category: z.object({
                    id: z.number(),
                    name: z.string(),
                }),
            }),
        }),
    }),
});

export const getCouponsResponseSchema = z.object({
    coupons: z.array(
        z.object({
            id: z.number(),
            code: z.string(),
            validFrom: z.date(),
            validUntil: z.date(),
            state: z.nativeEnum(CouponState),
            quantityLimit: z.number().nullable(),
            createdAt: z.date(),
            updatedAt: z.date(),
            offerId: z.number(), // store this as an ID and make another query to this endpoint if necessary
        })
    ),
});

export const redeemCouponRequestSchema = z.object({
    DUI: z.string().openapi({ description: "DUI of the user redeeming the coupon", example: "123456789" }),
})
