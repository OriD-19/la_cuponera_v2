import { Hono } from "hono";
import { validator as zValidator } from "hono-openapi/zod";
import { createCategorySchema } from "../../schemas/categories";
import { describeRoute } from "hono-openapi";
import { createCategoryDocs } from "../../documentation/categories.docs";
import { Prisma, PrismaClient } from "@prisma/client";

// prefix: /api/v1/admin/categories
const app = new Hono();
const prisma = new PrismaClient();

app.post(
    "/categories",
    describeRoute(createCategoryDocs),
    zValidator('json', createCategorySchema),
    async c => {

        const validated = c.req.valid('json');

        try {
            await prisma.category.create({
                data: {
                    name: validated.name,
                    description: validated.description,
                },
            });

        } catch (err: any) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    return c.json({
                        message: "error: must input unique name",
                    }, 400);
                }
            }
        }

        return c.json({
            message: "category created successfully",
        })
    }
);

app.patch(
    "/categories",
    async c => {

    }
);