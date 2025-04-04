import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { getEnterprisesDocs, getEnterpriseDocs, updateEnterpriseDocs, deleteEnterpriseDocs } from '../../documentation/enterprises.docs';
import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { getOffersEnterpriseDocs } from '../../documentation/offers.docs';
import { getEmployeesDocs } from '../../documentation/employees.docs';
import { registerEnterpriseRequestSchema } from '../../schemas/register';
import { validator as zValidator } from 'hono-openapi/zod';

// prefix: /api/admin/v1/enterprises
const app = new Hono();
const prisma = new PrismaClient();

app.get(
    "/",
    describeRoute(getEnterprisesDocs),
    async c => {

        const enterprises = await prisma.enterprise.findMany({
            orderBy: {
                enterpriseCode: 'asc',
            },
            include: {
                user: true,
                Category: true,
            }
        });

        return c.json(enterprises);
    });

app.get(
    "/:enterpriseId",
    describeRoute(getEnterpriseDocs),
    async c => {

        const enterpriseId = c.req.param('enterpriseId');

        const enterprise = await prisma.enterprise.findUnique({
            where: {
                id: parseInt(enterpriseId),
            },
        });

        return c.json(enterprise);
    });

app.patch(
    "/:enterpriseId",
    describeRoute(updateEnterpriseDocs),
    zValidator('json', registerEnterpriseRequestSchema),
    async c => {

        const enterpriseId = c.req.param('enterpriseId');
        const validated = c.req.valid('json');

        const enterprise = await prisma.enterprise.update({
            where: {
                id: parseInt(enterpriseId),
            },
            data: {
                user: {
                    update: {
                        firstName: validated.firstName,
                        email: validated.email,
                    },
                },
                phone: validated.phone,
                location: validated.address,
                commissionPercentage: validated.commissionPercentage,
                description: validated.description,
            },
        });

        return c.json(enterprise);
    });

app.delete(
    "/:enterpriseId",
    describeRoute(deleteEnterpriseDocs),
    async c => {

        const enterpriseId = c.req.param('enterpriseId');

        const enterprise = await prisma.enterprise.delete({
            where: {
                id: parseInt(enterpriseId),
            },
        });

        return c.json(enterprise);
    });

app.get(
    '/:enterpriseId/offers',
    describeRoute(getOffersEnterpriseDocs),
    async c => {

        const enterpriseId = c.req.param("enterpriseId");
        const offset = c.req.query("offset") ?? "0";
        const limit = c.req.query("limit") ?? "10";

        const totalOffers = await prisma.offer.count({
            where: {
                enterpriseId: parseInt(enterpriseId),
            }
        });

        const numPages = Math.ceil(totalOffers / parseInt(limit));

        const offers = await prisma.offer.findMany({
            skip: parseInt(offset),
            take: parseInt(limit),
            where: {
                enterpriseId: parseInt(enterpriseId),
            }
        });

        const basePath = c.req.url.split("?")[0];

        return c.json({
            offers: offers,
            next: (
                parseInt(offset) + parseInt(limit) >= totalOffers
                    ? null
                    : `${basePath}?offset=${parseInt(offset) + parseInt(limit)}&limit=${limit}`
            ),
            prev: (
                parseInt(offset) - parseInt(limit) < 0
                    ? null
                    : `${basePath}?offset=${parseInt(offset) - parseInt(limit)}&limit=${limit}`
            ),
            numPages: numPages,
        });
    });

app.get(
    '/:enterpriseId/offers/:offerId',
    describeRoute(getOffersEnterpriseDocs),
    async c => {

        const enterpriseId = c.req.param('enterpriseId');
        const offerId = c.req.param('offerId');

        const offer = await prisma.offer.findFirst({
            where: {
                id: parseInt(offerId),
                enterpriseId: parseInt(enterpriseId),
            },
        });

        return c.json({
            offer: offer,
        });
    });

app.get(
    '/:enterpriseId/employees',
    describeRoute(getEmployeesDocs),
    async c => {

        const enterpriseId = c.req.param('enterpriseId');

        const employees = await prisma.employee.findMany({
            where: {
                enterpriseId: parseInt(enterpriseId),
            },
        });

        return c.json({
            employees: employees,
        });
    });

export default app;