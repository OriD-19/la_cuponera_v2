import { DescribeRouteOptions } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { registerClientRequestSchema, registerEmployeeRequestSchema, registerEnterpriseRequestSchema } from "../schemas/register";
import { z } from "zod";

export const registerClientDocs: DescribeRouteOptions = {
    description: "Register a new client in the system",
    requestParams: {
        header:
            z.object({
                "Authorization": z.string().openapi({ description: "The JWT token of the user" }),
            }),
    },
    requestBody: {
        content: {
            "application/json": {
                schema: resolver(registerClientRequestSchema),
            },
        },
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: {
                                type: "number",
                                description: "The ID of the new client",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "email already in use",
                            },
                        },
                    },
                },
            }
        },
    },
};

export const registerEnterpriseDocs: DescribeRouteOptions = {
    description: "Register a new enterprise in the system",
    requestParams: {
        header:
            z.object({
                "Authorization": z.string().openapi({ description: "The JWT token of the administrator" }),
            }),
    },
    requestBody: {
        content: {
            "application/json": {
                schema: resolver(registerEnterpriseRequestSchema),
            },
        },
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "enterprise registered successfully",
                            },
                            id: {
                                type: "number",
                                description: "The ID of the new enterprise",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "email already in use",
                            },
                        },
                    },
                },
            }
        },
    },
};

export const registerEmployeeDocs: DescribeRouteOptions = {
    description: "Register a new employee in the system",
    requestParams: {
        header:
            z.object({
                "Authorization": z.string().openapi({ description: "The JWT token of an enterprise" }),
            }),
    },
    requestBody: {
        content: {
            "application/json": {
                schema: resolver(registerEmployeeRequestSchema),
            },
        },
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "employee registered successfully",
                            },
                            id: {
                                type: "number",
                                description: "The ID of the new employee",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "email already in use",
                            },
                        },
                    },
                },
            }
        },
    },
};