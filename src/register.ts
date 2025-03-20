import { Hono } from 'hono';
import { Variables } from '../schemas/jwtVariables';
import { zValidator } from '@hono/zod-validator';
import { registerClientRequestSchema, registerEmployeeRequestSchema, registerEnterpriseRequestSchema } from '../schemas/register';

import { PrismaClient } from '@prisma/client';
import { authorization, Role } from '../middleware/authorization';

import { hash } from 'bcrypt';

const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

app.post("/client",
    zValidator('json', registerClientRequestSchema),
    async c => {

        const validated = c.req.valid('json');
        const passwordHash = await hash(validated.password, 10);

        const client = await prisma.client.create({
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
            message: "Client created successfully",
            data: client
        }, 201);
    });

// admin only
app.post("/enterprise",
    authorization(Role.ADMIN),
    zValidator('json', registerEnterpriseRequestSchema),
    async c => {

        const validated = c.req.valid('json');

        const enterpriseCode = validated.firstName
        const passwordHash = await hash(validated.password, 10);

        const enterprise = await prisma.enterprise.create({
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
            message: "Enterprise created successfully",
            data: enterprise
        }, 201);
    });

// enterprise admin only
app.post('/employee',
    authorization(Role.ENTERPRISE),
    zValidator('json', registerEmployeeRequestSchema),
    async c => {

        const validated = c.req.valid('json');
        const passwordHash = await hash(validated.password, 10);

        const employee = await prisma.employee.create({
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
            message: "Employee created successfully",
            data: employee
        }, 201);
    });

export default app;