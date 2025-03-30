import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { getCategoriesDocs } from "../documentation/categories.docs";
import { describeRoute } from "hono-openapi";

// prefix: /api/v1/categories
const app = new Hono();
const prisma = new PrismaClient();

app.get(
    "/",
    describeRoute(getCategoriesDocs),
    async c => {
        const categories = await prisma.category.findMany();

        return c.json({
            categories,
        })
    }
);

export default app;