import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { jwt } from 'hono/jwt';
import { describeRoute } from 'hono-openapi';
import { Variables } from '../schemas/jwtVariables';
import { deleteEmployeeDocs, getAllEmployeesDocs, getEmployeeDocs, updateEmployeeDocs } from '../documentation/employees.docs';
import { validator as zValidator } from "hono-openapi/zod";
import { updateEmployeeRequestSchema } from '../schemas/employees';
import { hash } from 'bcrypt';
import { authorization, Role } from '../middleware/authorization';

import 'dotenv/config';

// prefix: /api/v1/employees
const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

app.get(
    '/',
    describeRoute(getAllEmployeesDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.ENTERPRISE),
    async c => {
        const enterpriseId = parseInt(c.get('jwtPayload').enterpriseId!);

        const employees = await prisma.employee.findMany({
            where: {
                enterpriseId: enterpriseId,
            },
            include: {
                enterprise: true,
                user: true,
            },
            orderBy: {
                id: 'asc',
            },
        });

        return c.json(employees);
    });

app.get(
    '/:employeeId',
    describeRoute(getEmployeeDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.ENTERPRISE),
    async c => {
        const enterpriseId = parseInt(c.get('jwtPayload').enterpriseId!);
        const employeeId = c.req.param('employeeId');

        const employee = await prisma.employee.findUnique({
            where: {
                id: parseInt(employeeId),
            },
        });

        if (!employee) {
            return c.json({
                message: "employee not found",
            }, 404);
        }

        if (employee.enterpriseId !== enterpriseId) {
            return c.json({
                message: "cannot get employee from another enterprise",
            }, 403);
        }

        return c.json(employee);
    });

app.patch(
    '/:employeeId',
    describeRoute(updateEmployeeDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    zValidator('json', updateEmployeeRequestSchema),
    authorization(Role.ENTERPRISE),
    async c => {

        const validated = c.req.valid('json');

        const enterpriseId = parseInt(c.get('jwtPayload').enterpriseId!);
        const employeeId = c.req.param('employeeId');

        const employee = await prisma.employee.findUnique({
            where: {
                id: parseInt(employeeId),
            },
        });

        if (!employee) {
            return c.json({
                message: "employee not found",
            }, 404);
        }

        if (employee.enterpriseId !== enterpriseId) {
            return c.json({
                message: "cannot update employee from another enterprise",
            }, 403);
        }

        if (validated.password) {
            validated.password = await hash(validated.password, 10);
        }

        await prisma.employee.update({
            where: {
                id: parseInt(employeeId),
            },
            data: {
                ...validated,
            },
        });

        return c.json({
            message: `employee with id ${employeeId} updated successfully`,
        });
    });

app.delete(
    '/:employeeId',
    describeRoute(deleteEmployeeDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    authorization(Role.ENTERPRISE),
    async c => {

        const enterpriseId = parseInt(c.get('jwtPayload').enterpriseId!);
        const employeeId = c.req.param('employeeId');

        const employee = await prisma.employee.findUnique({
            where: {
                id: parseInt(employeeId),
            },
        });

        if (!employee) {
            return c.json({
                message: "employee not found",
            }, 404);
        }

        if (employee.enterpriseId !== enterpriseId) {
            return c.json({
                message: "cannot delete employee from another enterprise",
            }, 403);
        }

        await prisma.employee.delete({
            where: {
                id: parseInt(employeeId),
            },
        });

        return c.json({
            message: `employee with id ${employeeId} deleted successfully`,
        });
    });

export default app;