import { DescribeRouteOptions } from "hono-openapi";
import { updateEmployeeRequestSchema } from "../schemas/employees";
import { resolver } from "hono-openapi/zod";
import { z } from 'zod';

export const updateEmployeeDocs: DescribeRouteOptions = {
    description: "Update an employee",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
    },
    requestBody: {
        content: {
            "application/json": {
                schema: resolver(updateEmployeeRequestSchema),
            }
        }
    },
    responses: {
        200: {
            description: "employee updated successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "employee with id 1 updated successfully",
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: "employee not found",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "employee not found",
                            },
                        },
                    },
                },
            },
        },
        403: {
            description: "cannot update employee from another enterprise",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "cannot update employee from another enterprise", 
                            },
                        },
                    },
                },
            },
        },
    },
};

export const deleteEmployeeDocs: DescribeRouteOptions = {
    description: "Delete an employee",
    requestParams: {
        header: z.object({ 'Authorization': z.string() }),
        route: z.object({ employeeId: z.string() }),
    },
    responses: {
        200: {
            description: "employee deleted successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "employee with id 1 deleted successfully",
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: "employee not found",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "employee not found",
                            },
                        },
                    },
                },
            },
        },
        403: {
            description: "cannot delete employee from another enterprise",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "cannot delete employee from another enterprise",
                            },
                        },
                    },
                },
            },
        },
    },
};