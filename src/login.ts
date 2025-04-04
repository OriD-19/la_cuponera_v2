import { Hono } from 'hono';
import { sign } from "jsonwebtoken";

import { config } from 'dotenv';
import { validator as zValidator } from 'hono-openapi/zod';
import { loginRequestSchema } from '../schemas/login';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { describeRoute } from 'hono-openapi';
import { loginDocs } from '../documentation/login.docs';
config();

// prefix: /api/v1/login
const app = new Hono();
const prisma = new PrismaClient();

app.post(
    "/",
    describeRoute(loginDocs),
    zValidator('json', loginRequestSchema),
    async (c) => {
        const validated = c.req.valid('json');
        const token_secret = process.env.TOKEN_SECRET;

        const user = await prisma.user.findUnique({
            where: {
                email: validated.email,
            }
        });

        if (!user) {
            return c.json({
                message: "incorrect user credentials",
            }, 400);
        }

        // check password with bcrypt
        const validPassword = await compare(validated.password, user.password);

        if (!validPassword) {
            return c.json({
                message: "incorrect user credentials",
            }, 400);
        }

        // switch the type of the user with each type of entity

        const client = await prisma.client.findUnique({
            where: {
                userId: user.id,
            }
        });

        if (client) {
            const token = sign({
                id: user.id,
                role: "client",
                clientId: client.id,
                email: user.email,
            }, token_secret!, {
                expiresIn: "6h"
            });

            return c.json({
                message: "logged in successfully",
                token,
            });
        }

        const admin = await prisma.admin.findUnique({
            where: {
                userId: user.id,
            }
        });

        if (admin) {
            const token = sign({
                id: user.id,
                adminId: admin.id,
                role: "admin",
                email: user.email,
            }, token_secret!, {
                expiresIn: "6h"
            });

            return c.json({
                message: "logged in successfully",
                token,
            });
        }

        const employee = await prisma.employee.findUnique({
            where: {
                userId: user.id,
            }
        });

        if (employee) {
            const token = sign({
                id: user.id,
                employeeId: employee.id,
                role: "employee",
                email: user.email,
            }, token_secret!, {
                expiresIn: "6h"
            });

            return c.json({
                message: "logged in successfully",
                token,
            });
        }

        const enterprise = await prisma.enterprise.findUnique({
            where: {
                userId: user.id,
            }
        });

        if (enterprise) {
            const token = sign({
                id: user.id,
                enterpriseId: enterprise.id,
                role: "enterprise",
                email: user.email,
            }, token_secret!, {
                expiresIn: "6h"
            });

            return c.json({
                message: "logged in successfully",
                token,
            });
        }

        return c.json({
            message: "unknown user type",
        }, 500);
    });

export default app;