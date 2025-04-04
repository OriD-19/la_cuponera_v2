import { DescribeRouteOptions } from "hono-openapi";
import { EnterpriseSchema, EnterpriseWithPartialRelationsSchema } from "../prisma/generated/zod";
import { resolver } from "hono-openapi/zod";
import { z } from 'zod';
import { updateEnterpriseRequestSchema } from "../schemas/enterprises";

export const getEnterprisesDocs: DescribeRouteOptions = {
    description: "Get a list of enterprises",
    responses: {
        200: {
            description: "A list of enterprises",
            content: {
                "application/json": {
                    schema: resolver(z.array(EnterpriseWithPartialRelationsSchema)),
                },
            },
        },
    }
};

export const getEnterpriseDocs: DescribeRouteOptions = {
    description: "Get a single enterprise",
    responses: {
        200: {
            description: "A single enterprise",
            content: {
                "application/json": {
                    schema: resolver(EnterpriseWithPartialRelationsSchema),
                },
            },
        },
    }
};

export const updateEnterpriseDocs: DescribeRouteOptions = {
    description: "Update a single enterprise",
    requestBody: {
        description: "The enterprise to update",
        content: {
            "application/json": {
                schema: resolver(updateEnterpriseRequestSchema)            },
        },
    },
    responses: {
        200: {
            description: "The updated enterprise",
            content: {
                "application/json": {
                    schema: resolver(EnterpriseSchema),
                },
            },
        },
    }
};

export const deleteEnterpriseDocs: DescribeRouteOptions = {
    description: "Delete a single enterprise",
    responses: {
        200: {
            description: "The deleted enterprise",
            content: {
                "application/json": {
                    schema: resolver(EnterpriseSchema),
                },
            },
        },
    }
};
