import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { Variables } from '../schemas/jwtVariables';
import { describeRoute } from 'hono-openapi';
import { profileDocs } from '../documentation/profile.docs';

// prefix: /api/v1/profile
const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

app.get('/',
    describeRoute(profileDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    async (c) => {
        // obtain the user from the auth token
        const user = c.get('jwtPayload');
        const userId = user?.id;
        const userRole = user?.role;

        console.log(userId, userRole);

        if (!userId) {
            return c.json({ error: 'user is required' }, 400);
        }

        try {
            const profile = await prisma.user.findUnique({
                where: { id: Number(userId) },
            });

            if (!profile) {
                return c.json({ error: 'profile not found' }, 404);
            }

            // search for the user role
            const client = await prisma.client.findUnique({
                where: { userId: Number(userId) },
            });

            if (client) {
                return c.json({
                    ...profile,
                    password: undefined,
                    ...client,
                    userId: undefined,
                    role: userRole,
                })
            }

            const employee = await prisma.employee.findUnique({
                where: { userId: Number(userId) },
            });
            if (employee) {
                return c.json({
                    ...profile,
                    password: undefined,
                    ...employee,
                    userId: undefined,
                    role: userRole,
                })
            }

            const enterprise = await prisma.enterprise.findUnique({
                where: { userId: Number(userId) },
            });
            if (enterprise) {
                return c.json({
                    ...profile,
                    password: undefined,
                    ...enterprise,
                    userId: undefined,
                    role: userRole,
                })
            }

            const admin = await prisma.admin.findUnique({
                where: { userId: Number(userId) },
            });
            if (admin) {
                return c.json({
                    ...profile,
                    password: undefined,
                    ...admin,
                    userId: undefined,
                    role: userRole,
                })
            }

            return c.json(profile);
        } catch (error) {
            console.error(error);
            return c.json({ error: 'internal server error' }, 500);
        }
});

export default app;