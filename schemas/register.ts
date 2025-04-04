import { z } from 'zod';
import 'zod-openapi/extend';

export const registerClientRequestSchema = z.object({
    email: z.string().email().openapi({ description: "The email address of the client", example: "fernando@fernando.com" }),
    password: z.string().min(8).openapi({ description: "The password for the client account", example: "securePassword123" }),
    firstName: z.string().openapi({ description: "The first name of the client", example: "Fernando" }),
    lastName: z.string().openapi({ description: "The last name of the client", example: "Fernandez" }),
    phone: z.string().openapi({ description: "The phone number of the client", example: "+1234567890" }),
    DUI: z.string().openapi({ description: "The DUI of the client", example: "000000000" }),
});

export const registerEnterpriseRequestSchema = z.object({
    email: z.string().email().openapi({ description: "The email address of the enterprise", example: "fernando@fernando.com" }),
    password: z.string().min(8).openapi({ description: "The password for the enterprise account", example: "securePassword123" }),
    description: z.string().openapi({ description: "The description of the enterprise", example: "A company that sells cars" }),
    firstName: z.string().openapi({ description: "The first name of the enterprise owner", example: "Fernando" }),
    commissionPercentage: z.number().openapi({ description: "The commission percentage of the enterprise", example: 10 }),
    phone: z.string().openapi({ description: "The phone number of the enterprise", example: "+1234567890" }),
    address: z.string().openapi({ description: "The address of the enterprise", example: "1234 Main St" }),
    categoryId: z.number().openapi({ description: "The category ID of the enterprise", example: 1 }),
});

export const registerEmployeeRequestSchema = z.object({
    email: z.string().email().openapi({ description: "The email address of the employee", example: "fernando@fernando.com" }),
    password: z.string().min(8).openapi({ description: "The password for the employee account", example: "securePassword123" }),
    firstName: z.string().openapi({ description: "The first name of the employee", example: "Fernando" }),
    lastName: z.string().openapi({ description: "The last name of the employee", example: "Fernandez" }),
    phone: z.string().openapi({ description: "The phone number of the employee", example: "+1234567890" }),

    enterpriseId: z.number().openapi({ description: "The ID of the enterprise the employee belongs to", example: 1 }),
});
