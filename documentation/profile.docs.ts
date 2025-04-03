import { DescribeRouteOptions } from "hono-openapi";
import { z } from "zod";
import { UserSchema } from "../prisma/generated/zod";
import { resolver } from "hono-openapi/zod";

export const profileDocs: DescribeRouteOptions = {
    description: "Get the profile of the user",
    requestParams: {
        header:
            z.object({
                "Authorization": z.string().openapi({ description: "The JWT token of the user" }),
            }),
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: resolver(UserSchema),
                },
            },
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            error: {
                                type: "string",
                                example: "Unauthorized",
                            },
                        },
                    },
                },
            }
        },
    },
};