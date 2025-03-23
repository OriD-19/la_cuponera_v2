import { DescribeRouteOptions } from "hono-openapi";
import { EnterpriseWithPartialRelationsSchema } from "../prisma/generated/zod";
import { resolver } from "hono-openapi/zod";
import { z } from 'zod';

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