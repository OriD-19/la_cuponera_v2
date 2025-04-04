import { DescribeRouteOptions } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from "zod";
import { ClientSchema } from "../prisma/generated/zod";
import { getClientDetailsResponseSchema } from "../schemas/clients";

export const deleteClientsRequestDocs: DescribeRouteOptions = {
    description: "Delete a client",
    params: {
        clientId: {
            description: "The ID of the client to delete",
            required: true,
            type: "number",
        },
    },
    responses: {
        200: {
            description: "Client deleted successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                            },
                        },
                    },
                },
            },
        },
    },
};

export const getAllClientsRequestDocs: DescribeRouteOptions = {
    description: "Get a list of all clients alongside with their coupons",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
    },
    responses: {
        200: {
            description: "List of clients",
            content: {
                "application/json": {
                    schema: resolver(z.array(getClientDetailsResponseSchema)),
                },
            },
        },
    },
};

export const getClientDetailsResponseDocs: DescribeRouteOptions = {
    description: "Get a client details",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
    },
    responses: {
        200: {
            description: "Client details",
            content: {
                "application/json": {
                    schema: resolver(getClientDetailsResponseSchema),
                },
            },
        },
    },
};
