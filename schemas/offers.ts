import { OfferState } from "@prisma/client";
import { z } from "zod";

import "zod-openapi/extend";

// This is for ADMIN users only (contains all the information).
export const getAdminOffersResponseSchema = z.object({
    // validate with the prisma schema
    offers: z.array(
        z.object({
            id: z.number().openapi({ description: "The unique identifier of the offer", example: 1 }),
            title: z.string().openapi({ description: "The title of the offer", example: "50% Off on Electronics" }),
            description: z.string().openapi({ description: "A detailed description of the offer", example: "Get 50% off on all electronic items this weekend." }),
            originalPrice: z.number().openapi({ description: "The original price of the product or service", example: 100 }),
            discountPrice: z.number().openapi({ description: "The discounted price of the product or service", example: 50 }),
            validFrom: z.date().openapi({ description: "The start date from which the offer is valid", example: "2023-01-01T00:00:00.000Z" }),
            validUntil: z.date().openapi({ description: "The end date until which the offer is valid", example: "2023-01-07T23:59:59.999Z" }),
            quantityLimit: z.number().optional().openapi({ description: "The maximum quantity available for the offer (optional)", example: 100 }),
            sold: z.number().openapi({ description: "The number of items sold for the offer", example: 20 }),
            createdAt: z.date().openapi({ description: "The date when the offer was created", example: "2023-01-01T00:00:00.000Z" }),

            offerState: z.nativeEnum(OfferState).openapi({ description: "The current state of the offer", example: "PENDING" }),
            approvedAt: z.date().optional().openapi({ description: "The date when the offer was approved (optional)", example: "2023-01-02T00:00:00.000Z" }),
            offerRejectedReason: z.string().optional().openapi({ description: "The reason for rejecting the offer (optional)", example: "Insufficient details provided" }),

            enterprise: z.object({
                id: z.number().openapi({ description: "The unique identifier of the enterprise", example: 1 }),
                name: z.string().openapi({ description: "The name of the enterprise", example: "TechCorp" }),
                email: z.string().openapi({ description: "The email address of the enterprise", example: "contact@techcorp.com" }),
                phone: z.string().openapi({ description: "The phone number of the enterprise", example: "+1234567890" }),
                address: z.string().openapi({ description: "The address of the enterprise", example: "123 Tech Street, Silicon Valley" }),
                createdAt: z.date().openapi({ description: "The date when the enterprise was created", example: "2022-01-01T00:00:00.000Z" }),
                category: z.object({
                    id: z.number().openapi({ description: "The unique identifier of the category", example: 1 }),
                    name: z.string().openapi({ description: "The name of the category", example: "Electronics" }),
                    description: z.string().openapi({ description: "A detailed description of the category", example: "All kinds of electronic items" }),
                    createdAt: z.date().openapi({ description: "The date when the category was created", example: "2022-01-01T00:00:00.000Z" }),
                }),
            }),
        })
    ),
}).openapi({ description: "Schema for the response containing offers for admin users" });

export const getOffersResponseSchema = z.object({
    offers: z.array(
        z.object({
            id: z.number().openapi({ description: "The unique identifier of the offer", example: 1 }),
            title: z.string().openapi({ description: "The title of the offer", example: "50% Off on Electronics" }),
            originalPrice: z.number().openapi({ description: "The original price of the product or service", example: 100 }),
            discountPrice: z.number().openapi({ description: "The discounted price of the product or service", example: 50 }),
            validFrom: z.date().openapi({ description: "The start date from which the offer is valid", example: "2023-01-01T00:00:00.000Z" }),
            validUntil: z.date().openapi({ description: "The end date until which the offer is valid", example: "2023-01-07T23:59:59.999Z" }),

            enterprise: z.object({
                id: z.number().openapi({ description: "The unique identifier of the enterprise", example: 1 }),
                name: z.string().openapi({ description: "The name of the enterprise", example: "TechCorp" }),
                email: z.string().openapi({ description: "The email address of the enterprise", example: "contact@techcorp.com" }),
                phone: z.string().openapi({ description: "The phone number of the enterprise", example: "+1234567890" }),
                address: z.string().openapi({ description: "The address of the enterprise", example: "123 Tech Street, Silicon Valley" }),
                category: z.object({
                    id: z.number().openapi({ description: "The unique identifier of the category", example: 1 }),
                    name: z.string().openapi({ description: "The name of the category", example: "Electronics" }),
                    description: z.string().openapi({ description: "A detailed description of the category", example: "All kinds of electronic items" }),
                }),
            }),
        })
    ),
}).openapi({ description: "Schema for the response containing offers for general users" });

export const getOfferDetailsSchema = z.object({
    offer: z.object({
        id: z.number().openapi({ description: "The unique identifier of the offer", example: 1 }),
        title: z.string().openapi({ description: "The title of the offer", example: "50% Off on Electronics" }),
        description: z.string().openapi({ description: "A detailed description of the offer", example: "Get 50% off on all electronic items this weekend." }),
        originalPrice: z.number().openapi({ description: "The original price of the product or service", example: 100 }),
        discountPrice: z.number().openapi({ description: "The discounted price of the product or service", example: 50 }),
        validFrom: z.date().openapi({ description: "The start date from which the offer is valid", example: "2023-01-01T00:00:00.000Z" }),
        validUntil: z.date().openapi({ description: "The end date until which the offer is valid", example: "2023-01-07T23:59:59.999Z" }),

        quantityLimit: z.number().optional().openapi({ description: "The maximum quantity available for the offer (optional)", example: 100 }),
        sold: z.number().openapi({ description: "The number of items sold for the offer", example: 20 }),

        enterprise: z.object({
            id: z.number().openapi({ description: "The unique identifier of the enterprise", example: 1 }),
            name: z.string().openapi({ description: "The name of the enterprise", example: "TechCorp" }),
            email: z.string().openapi({ description: "The email address of the enterprise", example: "contact@techcorp.com" }),
            phone: z.string().openapi({ description: "The phone number of the enterprise", example: "+1234567890" }),
            address: z.string().openapi({ description: "The address of the enterprise", example: "123 Tech Street, Silicon Valley" }),
            category: z.object({
                id: z.number().openapi({ description: "The unique identifier of the category", example: 1 }),
                name: z.string().openapi({ description: "The name of the category", example: "Electronics" }),
                description: z.string().openapi({ description: "A detailed description of the category", example: "All kinds of electronic items" }),
            }),
        }),
    }),
}).openapi({ description: "Schema for the response containing detailed information about a specific offer" });

export const createOfferRequestSchema = z.object({
    // get the enterprise information from the JWT token in the route controller
    // by default, all the offers are in the PENDING state
    title: z.string().openapi({ description: "The title of the offer", example: "50% Off on Electronics" }),
    description: z.string().openapi({ description: "A detailed description of the offer", example: "Get 50% off on all electronic items this weekend." }),
    originalPrice: z.number().openapi({ description: "The original price of the product or service", example: 100 }),
    discountPrice: z.number().openapi({ description: "The discounted price of the product or service", example: 50 }),
    validFrom: z.date().openapi({ description: "The start date from which the offer is valid", example: "2023-01-01T00:00:00.000Z" }),
    validUntil: z.date().openapi({ description: "The end date until which the offer is valid", example: "2023-01-07T23:59:59.999Z" }),
    quantityLimit: z.number().optional().openapi({ description: "The maximum quantity available for the offer (optional)", example: 100 }),
    categoryId: z.number().openapi({ description: "The ID of the category to which the offer belongs", example: 1 }),
});

export const updateOfferRequestSchema = z.object({
    // all fields are optional, since it is a PATCH request
    title: z.string().optional().openapi({ description: "The title of the offer (optional)", example: "50% Off on Electronics" }),
    description: z.string().optional().openapi({ description: "A detailed description of the offer (optional)", example: "Get 50% off on all electronic items this weekend." }),
    originalPrice: z.number().optional().openapi({ description: "The original price of the product or service (optional)", example: 100 }),
    discountPrice: z.number().optional().openapi({ description: "The discounted price of the product or service (optional)", example: 50 }),
    validFrom: z.date().optional().openapi({ description: "The start date from which the offer is valid (optional)", example: "2023-01-01T00:00:00.000Z" }),
    validUntil: z.date().optional().openapi({ description: "The end date until which the offer is valid (optional)", example: "2023-01-07T23:59:59.999Z" }),
    quantityLimit: z.number().optional().openapi({ description: "The maximum quantity available for the offer (optional)", example: 100 }),
    categoryId: z.number().optional().openapi({ description: "The ID of the category to which the offer belongs (optional)", example: 1 }),
}).openapi({ description: "Schema for updating an offer" });

export const approveOfferSchema = z.object({
    offerId: z.number().openapi({ description: "The unique identifier of the offer to approve", example: 1 }),
}).openapi({ description: "Schema for approving an offer" });

export const rejectOfferSchema = z.object({
    reason: z.string().openapi({ description: "The reason for rejecting the offer", example: "Insufficient details provided" }),
}).openapi({ description: "Schema for rejecting an offer" });