import { Hono } from "hono";
import { validator as zValidator } from "hono-openapi/zod";
import { createCategorySchema, updateCategorySchema } from "../../schemas/categories";
import { describeRoute } from "hono-openapi";
import { createCategoryDocs, updateCategoryDocs } from "../../documentation/categories.docs";
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
        });
    }
);

app.patch(
    "/categories/:categoryId",
    describeRoute(updateCategoryDocs),
    zValidator('json', updateCategorySchema),
    async c => {
        const categoryId = c.req.param('categoryId');

        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(categoryId),
            },
        });

        if (!category) {
            return c.json({
                message: "category not found",
            }, 404);
        }
    }
);