import { z } from 'zod';

import 'zod-openapi/extend';

export const loginRequestSchema = z.object({
    email: z.string().email().openapi({ description: "The email address of the user", example: "fernando@carlos.com"}),
    password: z.string().min(8).openapi({ description: "The password for the user account", example: "securePassword123"}),
});