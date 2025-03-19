import { z } from 'zod';

import 'zod-openapi/extend';

// only for admin

export const getEnterpriseDetailsResponseSchema = z.object({
    enterprise: z.object({
        id: z.number(),
        firstName: z.string(),
        description: z.string(),
        email: z.string(),
        phone: z.string(),
        location: z.string(),
        category: z.object({
            id: z.number(),
            name: z.string(),
            description: z.string(),
        }),
        createdAt: z.date(),
        updatedAt: z.date(),
        employees: z.array(
            z.object({
                id: z.number(),
                firstName: z.string(),
                lastName: z.string(),
                email: z.string(),
                phone: z.string(),
            })
        ),
    }),
});

export const getEnterprisesResponseSchema = z.object({
    enterprises: z.array(
        z.object({
            id: z.number(),
            firstName: z.string(),
            email: z.string(),
            phone: z.string(),
            location: z.string(),
            category: z.object({
                id: z.number(),
                name: z.string(),
                description: z.string(),
            }),
            createdAt: z.date(),
            updatedAt: z.date(),
        })
    ),
});
