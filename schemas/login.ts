import { z } from 'zod';

import 'zod-openapi/extend';

export const loginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});