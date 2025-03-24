import { DescribeRouteOptions } from "hono-openapi";
import { z } from "zod";

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