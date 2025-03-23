import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import 'dotenv/config';
import { jwt } from 'hono/jwt';
import { describeRoute } from 'hono-openapi';
import { Variables } from '../schemas/jwtVariables';
import { deleteEmployeeDocs, updateEmployeeDocs } from '../documentation/employees.docs';

// prefix: /api/v1/employees
const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

app.patch(
    '/:employeeId',
    describeRoute(updateEmployeeDocs),
    jwt({
        secret: process.env.TOKEN_SECRET!,
    }),
    async c => {

        const enterpriseId = parseInt(c.get('jwtPayload').id);
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

        await prisma.employee.update({
            where: {
                id: parseInt(employeeId),
            },
            data: {
                // update fields
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
    async c => {

        const enterpriseId = parseInt(c.get('jwtPayload').id);
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