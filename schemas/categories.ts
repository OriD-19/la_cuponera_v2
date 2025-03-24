import { z } from "zod";

import "zod-openapi/extend";

export const createCategorySchema = z.object({
    name: z.string().openapi({ description: "The name of the category", example: "Electronics" }),
    description: z.string().openapi({ description: "The description of the category", example: "All electronics" }),
})

export const updateCategorySchema = z.object({
    name: z.string().optional().openapi({ description: "The name of the category", example: "Electronics" }),
    description: z.string().optional().openapi({ description: "The description of the category", example: "All electronics" }),
})