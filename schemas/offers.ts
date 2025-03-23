import { OfferState } from "@prisma/client";
import { z } from "zod";

import "zod-openapi/extend";

// This is for ADMIN users only (contains all the information).
export const getAdminOffersResponseSchema = z.object({
    // validate with the prisma schema
    offers: z.array(
        z.object({
            id: z.number(),
            title: z.string(),
            description: z.string(),
            originalPrice: z.number(),
            discountPrice: z.number(),
            validFrom: z.date(),
            validUntil: z.date(),
            quantityLimit: z.number().nullable(),
            sold: z.number(),
            createdAt: z.date(),

            offerState: z.nativeEnum(OfferState),
            approvedAt: z.date().nullable(),
            offerRejectedReason: z.string().nullable(),

            enterprise: z.object({
                id: z.number(),
                name: z.string(),
                email: z.string(),
                phone: z.string(),
                address: z.string(),
                createdAt: z.date(),
                category: z.object({
                    id: z.number(),
                    name: z.string(),
                    description: z.string(),
                    createdAt: z.date(),
                }),
            }),
        })
    ),
});

export const getOffersResponseSchema = z.object({
    offers: z.array(
        z.object({
            id: z.number(),
            title: z.string(),
            originalPrice: z.number(),
            discountPrice: z.number(),
            validFrom: z.date(),
            validUntil: z.date(),

            enterprise: z.object({
                id: z.number(),
                name: z.string(),
                email: z.string(),
                phone: z.string(),
                address: z.string(),
                category: z.object({
                    id: z.number(),
                    name: z.string(),
                    description: z.string(),
                }),
            }),
        })
    ),
})

export const getOfferDetailsSchema = z.object({
    offer: z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        originalPrice: z.number(),
        discountPrice: z.number(),
        validFrom: z.date(),
        validUntil: z.date(),

        quantityLimit: z.number().nullable(),
        sold: z.number(),

        enterprise: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string(),
            phone: z.string(),
            address: z.string(),
            category: z.object({
                id: z.number(),
                name: z.string(),
                description: z.string(),
            }),
        }),
    }),
});

export const createOfferSchema = z.object({
    // get the enterprise information from the JWT token in the route controller
    // by default, all the offers are in the PENDING state
    title: z.string(),
    description: z.string(),
    originalPrice: z.number(),
    discountPrice: z.number(),
    validFrom: z.date(),
    validUntil: z.date(),
    quantityLimit: z.number().nullable(),
    categoryId: z.number(),
});

export const updateOfferSchema = z.object({
    // all fields are optional, since it is a PATCH request
    title: z.string().nullable(),
    description: z.string().nullable(),
    originalPrice: z.number().nullable(),
    discountPrice: z.number().nullable(),
    validFrom: z.date().nullable(),
    validUntil: z.date().nullable(),
    quantityLimit: z.number().nullable(),
    categoryId: z.number().nullable(),
});

export const approveOfferSchema = z.object({
    offerId: z.number(),
});

export const rejectOfferSchema = z.object({
    offerId: z.number(),
    reason: z.string(),
});