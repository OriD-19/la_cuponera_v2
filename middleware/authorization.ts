import { createMiddleware } from 'hono/factory';
import { Variables } from '../schemas/jwtVariables';

export enum Role {
    CLIENT = 'client',
    EMPLOYEE = 'employee',
    ENTERPRISE = 'enterprise',
    ADMIN = 'admin'
};

export const authorization = (role: Role) => {
    return createMiddleware<{ Variables: Variables }>(async (c, next) => {
        let jwt = c.get('jwtPayload');

        console.log("jwt", jwt.role, role);

        if (jwt.role !== role) {
            return c.json({
                message: "Unauthorized"
            }, 401);
        }

        return next();
    });
};