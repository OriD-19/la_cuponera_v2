import { DescribeRouteOptions } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { createOfferRequestSchema, getOffersResponseSchema } from "../schemas/offers";
import { OfferSchema } from "../prisma/generated/zod";
import { z } from "zod";

export const createOfferDocs: DescribeRouteOptions = {
    description: "Create a new offer",
    requestParams: {
        header: z.object({'Authorization': z.string()}),
    },
    requestBody: {
        content: {
            "application/json": {
                schema: resolver(createOfferRequestSchema),
            }
        }
    },
    responses: {
        201: {
            description: "offer created successfully, waiting for approval",
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
        400: {
            description: "could not create offer with provided information",
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
    }
};

export const getOffersDocs: DescribeRouteOptions = {
    description: "Get all offers",
    responses: {
        200: {
            description: "offers retrieved successfully",
            content: {
                "application/json": {
                    schema: resolver(z.array(OfferSchema)),
                },
            },
        },
    },
};

export const getOfferDocs: DescribeRouteOptions = {
    description: "Get a specific offer",
    requestParams: {
        header: z.object({'Authorization': z.string()}),
    },
    responses: {
        200: {
            description: "offer retrieved successfully",
            content: {
                "application/json": {
                    schema: resolver(OfferSchema),
                },
            },
        },
        404: {
            description: "offer not found",
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