import type { JwtVariables } from 'hono/jwt';

export type Variables = JwtVariables<{
    id: string,
    clientId?: string,
    employeeId?: string,
    adminId?: string,
    enterpriseId?: string,
    role: string,
    email: string,
    name: string,
}>;