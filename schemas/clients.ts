import { CouponState } from '@prisma/client';
import { z } from 'zod';

import 'zod-openapi/extend';

export const getClientDetailsResponseSchema = z.object({
    client: z.object({
        id: z.number(),
        enterpriseCode: z.string(),
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
    }),
    coupons: z.array(
        z.object({
            couponId: z.number(),
            couponDetails: z.object({
                id: z.number(),
                code: z.string(),
                validFrom: z.date(),
                validUntil: z.date(),
                state: z.nativeEnum(CouponState),
                quantityLimit: z.number().nullable(),
                offerId: z.number(), // store this as an ID and make another query to this endpoint if necessary
            })
        })
    )
});

// admin only
export const getClientsResponseSchema = z.object({
    clients: z.array(
        z.object({
            id: z.number(),
            enterpriseCode: z.string(),
            email: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            phone: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
        })
    ),
});
