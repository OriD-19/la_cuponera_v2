import { DescribeRouteOptions } from "hono-openapi";

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