import { Hono } from 'hono';
import { Variables } from '../schemas/jwtVariables';
import { zValidator } from '@hono/zod-validator';
import { registerClientRequestSchema, registerEmployeeRequestSchema, registerEnterpriseRequestSchema } from '../schemas/register';

import { Prisma, PrismaClient } from '@prisma/client';
import { authorization, Role } from '../middleware/authorization';

import { hash } from 'bcrypt';

const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

app.post("/client",
    zValidator('json', registerClientRequestSchema),
    async c => {

        const validated = c.req.valid('json');
        const passwordHash = await hash(validated.password, 10);

        try {
            await prisma.client.create({
                data: {
                    user: {
                        create: {
                            firstName: validated.firstName,
                            lastName: validated.lastName,
                            email: validated.email,
                            password: passwordHash,
                        }
                    },
                    DUI: validated.DUI,
                    phone: validated.phone,
                }
            });

            return c.json({
                message: "client created successfully",
            }, 201);
        } catch (e: any) {

            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return c.json({
                        message: "error: must input unique email and DUI",
                    }, 400);
                }
            }

        }
    });

// admin only
app.post("/enterprise",
    authorization(Role.ADMIN),
    zValidator('json', registerEnterpriseRequestSchema),
    async c => {

        const validated = c.req.valid('json');

        const enterpriseCode = validated.firstName
        const passwordHash = await hash(validated.password, 10);

        try {
            await prisma.enterprise.create({
                data: {
                    user: {
                        create: {
                            firstName: validated.firstName,
                            email: validated.email,
                            password: passwordHash,
                        }
                    },
                    enterpriseCode: enterpriseCode,
                    location: validated.address,
                    commissionPercentage: validated.commissionPercentage,
                    phone: validated.phone,
                    description: validated.description,
                }
            });

            return c.json({
                message: "enterprise created successfully",
            }, 201);
        } catch (e: any) {

            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return c.json({
                        message: "error: must input unique email and DUI",
                    }, 400);
                }
            }

        }
    });

// enterprise admin only
app.post('/employee',
    authorization(Role.ENTERPRISE),
    zValidator('json', registerEmployeeRequestSchema),
    async c => {

        const validated = c.req.valid('json');
        const passwordHash = await hash(validated.password, 10);

        try {
            await prisma.employee.create({
                data: {
                    user: {
                        create: {
                            firstName: validated.firstName,
                            lastName: validated.lastName,
                            email: validated.email,
                            password: passwordHash,
                        }
                    },
                    phone: validated.phone,
                    enterprise: {
                        connect: {
                            id: validated.enterpriseId
                        }
                    }
                }
            });

            return c.json({
                message: "employee created successfully",
            }, 201);
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return c.json({
                        message: "error: must input unique email and DUI",
                    }, 400);
                }
            }
        }
    });

export default app;