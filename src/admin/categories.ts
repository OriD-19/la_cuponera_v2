import { Hono } from "hono";
import { validator as zValidator } from "hono-openapi/zod";
import { createCategorySchema, updateCategorySchema } from "../../schemas/categories";
import { describeRoute } from "hono-openapi";
import { createCategoryDocs, deleteCategoryDocs, updateCategoryDocs } from "../../documentation/categories.docs";
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
            const category = await prisma.category.create({
                data: {
                    name: validated.name,
                    description: validated.description,
                },
            });

            return c.json({
                message: "category created successfully",
                categoryId: category.id,
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

        const validated = c.req.valid('json');

        try {
            const updatedCategory = await prisma.category.update({
                where: {
                    id: parseInt(categoryId),
                },
                data: {
                    name: validated.name,
                    description: validated.description,
                },
            });

            return c.json({
                message: "category updated successfully",
                categoryId: updatedCategory.id,
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
    }
);

app.delete(
    "/categories/:categoryId",
    describeRoute(deleteCategoryDocs),
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

        await prisma.category.delete({
            where: {
                id: parseInt(categoryId),
            },
        });

        return c.json({
            message: "category deleted successfully",
        });
    }
)

export default app;