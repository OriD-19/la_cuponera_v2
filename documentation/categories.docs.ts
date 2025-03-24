import { DescribeRouteOptions } from "hono-openapi";
import { z } from "zod";
import { CategorySchema } from "../prisma/generated/zod";

export const getCategoriesDocs: DescribeRouteOptions = {
    description: "Get all categories",
    responses: {
        200: {
            description: "categories retrieved successfully",
            content: {
                "application/json": {
                    schema: z.object({
                        categories: z.array(CategorySchema),
                    }),
                },
            },
        },
    },
};

export const createCategoryDocs: DescribeRouteOptions = {
    description: "Create a new category",
    requestBody: {
        content: {
            "application/json": {
                schema: z.object({
                    name: z.string(),
                    description: z.string(),
                }),
            },
        },
    },
    responses: {
        201: {
            description: "category created successfully",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        400: {
            description: "category already exists",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
        }, 
        403: {
            description: "you do not have permissions to create a new category",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
        }
    },
};

export const updateCategoryDocs: DescribeRouteOptions = {
    description: "Update a category",
    requestBody: {
        content: {
            "application/json": {
                schema: z.object({
                    name: z.string().optional(),
                    description: z.string().optional(),
                }),
            },
        },
    },
    responses: {
        200: {
            description: "category updated successfully",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        404: {
            description: "category not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        403: {
            description: "you do not have permissions to update this category",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
        }
    },
};