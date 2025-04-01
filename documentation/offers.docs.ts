import { DescribeRouteOptions } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { createOfferRequestSchema, updateOfferRequestSchema } from "../schemas/offers";
import { OfferSchema, OfferWithPartialRelationsSchema, OfferWithRelationsSchema } from "../prisma/generated/zod";
import { z } from "zod";

import "zod-openapi/extend";

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

const getOffersResponseSchema = z.object({
    offers: z.array(OfferSchema),
    next: z.string().openapi({ example: "http://localhost:3000/api/v1/offers?offset=10&limit=10" }),
});

export const getOffersEnterpriseDocs: DescribeRouteOptions = {
    description: "Get all offers from an enterprise (enterprise users only)",
    parameters: [
        {
            name: "offset",
            in: "query",
            required: false,
            description: "pagination offset",
            schema: { type: "string" },
        },
        {
            name: "limit",
            in: "query",
            required: false,
            description: "pagination limit",
            schema: { type: "string" },
        },
    ],
    responses: {
        200: {
            description: "offers retrieved successfully",
            content: {
                "application/json": {
                    schema: resolver(getOffersResponseSchema),
                },
            },
        },
    },
};

export const getOffersDocs: DescribeRouteOptions = {
    description: "Get all offers (general purpose, suited for client-type users). Shows only approved offers within the valid date range.",
    parameters: [
        {
            name: "offset",
            in: "query",
            required: false,
            description: "pagination offset",
            schema: { type: "string" },
        },
        {
            name: "limit",
            in: "query",
            required: false,
            description: "pagination limit",
            schema: { type: "string" },
        },
    ],
    responses: {
        200: {
            description: "offers retrieved successfully",
            content: {
                "application/json": {
                    schema: resolver(getOffersResponseSchema),
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

export const getAllOffersForAdminDocs: DescribeRouteOptions = {
    description: "Get all offers for admin",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
    },
    security: [
        {
            bearerAuth: [],
        }
    ],
    parameters: [
        {
            name: "offset",
            in: "query",
            required: false,
            description: "pagination offset",
            schema: { type: "string" },
        },
        {
            name: "limit",
            in: "query",
            required: false,
            description: "pagination limit",
            schema: { type: "string" },
        },
    ],
    responses: {
        200: {
            description: "offers retrieved successfully",
            content: {
                "application/json": {
                    schema: resolver(getOffersResponseSchema),
                },
            },
        },
    },
};


export const getAllPendingOffersForAdminDocs: DescribeRouteOptions = {
    description: "Get all pending offers for admin",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
    },
    security: [
        {
            bearerAuth: [],
        }
    ],
    responses: {
        200: {
            description: "offers retrieved successfully",
            content: {
                "application/json": {
                    schema: resolver(getOffersResponseSchema),
                },
            },
        },
    },
};

export const rejectOfferAdminDocs: DescribeRouteOptions = {
    description: "Reject an offer for admin",
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
                schema: z.object({
                    reason: z.string().openapi({ description: "The reason to why the offer was rejected", example: "The offer does not meet the requirements" }),
                }),
            },
        },
    },
    responses: {
        200: {
            description: "offer rejected successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "offer with id 1 rejected successfully",
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

export const approveOfferAdminDocs: DescribeRouteOptions = {
    description: "Approve an offer for admin",
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
        200: {
            description: "offer approved successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "offer with id 1 approved successfully",
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
