import { DescribeRouteOptions } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { createOfferRequestSchema, updateOfferRequestSchema } from "../schemas/offers";
import { OfferSchema, OfferWithPartialRelationsSchema, OfferWithRelationsSchema } from "../prisma/generated/zod";
import { z } from "zod";

export const createOfferDocs: DescribeRouteOptions = {
    description: "Create a new offer",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
    },
    security: [
        {
            bearerAuth: [],
        }
    ],
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
                                example: "offer created successfully, waiting for approval",
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
                                example: "could not create offer with provided information",
                            },
                        },
                    },
                },
            },
        },
    }
};

export const getOffersDocs: DescribeRouteOptions = {
    description: "Get all offers (general purpose, suited for client-type users). Shows only approved offers within the valid date range.",
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
        header: z.object({ 'Authorization': z.string() }),
    },
    responses: {
        200: {
            description: "offer retrieved successfully",
            content: {
                "application/json": {
                    schema: resolver(OfferWithPartialRelationsSchema),
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
                                example: "offer not found",
                            },
                        },
                    },
                },
            },
        },
    },
};

export const updateOfferRequestDocs: DescribeRouteOptions = {
    description: "Update a specific offer",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
        route: z.object({ offerId: z.string() }),
    },
    security: [
        {
            bearerAuth: [],
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: resolver(updateOfferRequestSchema),
            }
        }
    },
    responses: {
        200: {
            description: "offer updated successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "offer with id 1 updated successfully",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "could not update offer with provided information",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "could not update offer with provided information",
                            },
                        },
                    },
                },
            },
        },
    },
};

export const buyCouponDocs: DescribeRouteOptions = {
    description: "Buy a coupon",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
        route: z.object({ offerId: z.string() }),
    },
    security: [
        {
            bearerAuth: [],
        }
    ],
    responses: {
        201: {
            description: "coupon bought successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "coupon bought successfully",
                            },
                            couponCode: {
                                type: "string",
                                example: "ABC1230000001",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "could not buy coupon",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "could not buy coupon",
                            },
                        },
                    },
                },
            },
        },
    },
};

export const deleteOfferDocs: DescribeRouteOptions = {
    description: "Delete a specific offer",
    requestParams: {
        route: z.object({ offerId: z.string() }),
    },
    security: [
        {
            bearerAuth: [],
        }
    ],
    responses: {
        200: {
            description: "offer deleted successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "offer with id 1 deleted successfully",
                            },
                        },
                    },
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
                                example: "offer not found",
                            },
                        },
                    },
                },
            },
        },
    },
};