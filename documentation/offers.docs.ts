import { DescribeRouteOptions } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { createOfferRequestSchema, getOffersResponseSchema } from "../schemas/offers";
import { OfferSchema } from "../prisma/generated/zod";

export const createOfferDocs: DescribeRouteOptions = {
    description: "Create a new offer",
    body: {
        content: {
            "application/json": {
                schema: resolver(createOfferRequestSchema)
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
                    schema: {
                        type: "array",
                        properties: {
                            offers: resolver(OfferSchema),
                            type: "object",
                        }
                    }
                }
            }
        }
    }
};