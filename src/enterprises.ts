import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { jwt } from 'hono/jwt';
import { authorization, Role } from '../middleware/authorization';
import { getOfferDocs, getOffersDocs } from '../documentation/offers.docs';
import { OfferState, PrismaClient } from '@prisma/client';

// prefix: /api/v1/enterprises
const app = new Hono();
const prisma = new PrismaClient();

app.get(
    ':enterpriseId/offers',
    describeRoute(getOffersDocs),
    async c => {
        const enterpriseId = parseInt(c.req.param('enterpriseId'));

        const isEnterprise = await prisma.enterprise.findUnique({
            where: {
                id: enterpriseId,
            },
        });

        if (!isEnterprise) {
            return c.json({ error: 'enterprise not found' }, 404);
        }

        const offers = await prisma.offer.findMany({
            where: {
                enterpriseId: enterpriseId,
                offerState: OfferState.ACTIVE,
            },
            orderBy: {
                id: 'asc',
            },
        });

        return c.json(offers);
    }
)

app.get(
    ':enterpriseId/offers/:offerId',
    describeRoute(getOfferDocs),
    async c => {
        const enterpriseId = parseInt(c.req.param('enterpriseId'));
        const offerId = parseInt(c.req.param('offerId'));

        const isEnterprise = await prisma.enterprise.findUnique({
            where: {
                id: enterpriseId,
            },
        });

        if (!isEnterprise) {
            return c.json({ error: 'enterprise not found' }, 404);
        }

        const offer = await prisma.offer.findUnique({
            where: {
                id: offerId,
                enterpriseId: enterpriseId,
                offerState: OfferState.ACTIVE,
            },
        });

        return c.json(offer);
    }
);

export default app;