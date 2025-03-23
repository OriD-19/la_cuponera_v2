import { z } from 'zod';

import 'zod-openapi/extend';

export const updateEmployeeRequestSchema = z.object({
    firstName: z.string().optional().openapi({ description: "The first name of the employee (optional)", example: "John" }),
    lastName: z.string().optional().openapi({ description: "The last name of the employee (optional)", example: "Doe" }),
    phone: z.string().optional().openapi({ description: "The phone number of the employee (optional)", example: "+1234567890" }),
    email: z.string().email().optional().openapi({ description: "The email address of the employee (optional)", example: "john.doe@example.com" }),
    password: z.string().optional().openapi({ description: "The password for the employee account (optional)", example: "securePassword123" }),
});

