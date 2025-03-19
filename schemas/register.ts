import { z } from 'zod';

import 'zod-openapi/extend';

export const registerClientRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    DUI: z.string(),
});

export const registerEnterpriseRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    commissionPercentage: z.number(),
    phone: z.string(),
    address: z.string(),
    categoryId: z.number(),
});

export const registerEmployeeRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),

    enterpriseId: z.number(),
});