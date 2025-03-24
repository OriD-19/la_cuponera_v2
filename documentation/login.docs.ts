import { DescribeRouteOptions } from "hono-openapi";
import { loginRequestSchema } from "../schemas/login";
import { resolver } from "hono-openapi/zod";

export const loginDocs: DescribeRouteOptions = {
    description: "Login to the system",
    requestBody: {
        content: {
            "application/json": {
                schema: resolver(loginRequestSchema),
            },
        },
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            token: {
                                type: "string",
                                description: "The JWT token",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "invalid email or password",
                            },
                        },
                    },
                },
            }
        },
    },
};