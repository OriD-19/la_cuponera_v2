import type { JwtVariables } from 'hono/jwt';

export type Variables = JwtVariables<{
    id: string,
    role: string,
    email: string,
    name: string,
}>;