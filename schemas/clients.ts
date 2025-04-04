import { CouponState } from '@prisma/client';
import { z } from 'zod';

import 'zod-openapi/extend';

export const getClientDetailsResponseSchema = z.object({
    user: z.object({
        id: z.number(),
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
    }),
    Coupons: z.array(z.object({
        code: z.string(),
        couponState: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        offerDetails: z.object({
            id: z.number(),
            title: z.string(),
            description: z.string(),
        }),
    })),
    DUI: z.string(),
    phone: z.string(),
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
            createdAt: z.string().date(),
            updatedAt: z.string().date(),
        })
    ),
});

export const updateProfileRequestSchema = z.object({
    firstName: z.string().optional().openapi({ description: "The first name of the client (optional)", example: "John" }),
    lastName: z.string().optional().openapi({ description: "The last name of the client (optional)", example: "Doe" }),
    phone: z.string().optional().openapi({ description: "The phone number of the client (optional)", example: "+1234567890" }),
    email: z.string().email().optional().openapi({ description: "The email address of the client (optional)", example: "fernando@fernando.com" }),
    password: z.string().optional().openapi({ description: "The password for the client account (optional)", example: "securePassword123" }),
});