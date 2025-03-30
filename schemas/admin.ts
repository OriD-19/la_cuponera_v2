import { z } from 'zod';

import 'zod-openapi/extend';

// only admin
export const getAdminDetailsResponseSchema = z.object({
    admin: z.object({
        id: z.number(),
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string(),
        createdAt: z.string().date(),
        updatedAt: z.string().date(),
    }),
});