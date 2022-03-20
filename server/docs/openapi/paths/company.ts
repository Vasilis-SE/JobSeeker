export = {
    '/api/v1/company': {
        post: {
            tags: ['Company Operations'],
            description: 'Create new company with the given properties on request body.',
            operationId: 'createCompany',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/create_company_payload',
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'The company was created and stored successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_success',
                            },
                        },
                    },
                },
                '400': {
                    description: 'Could not create new company due to invalid data given on request body',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_400',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Could not find one or more necessary resources to create the company',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_404',
                            },
                        },
                    },
                },
                '500': {
                    description: 'Could not create new company, something went wrong with the process',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_500',
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/v1/company/{id}': {
        patch: {
            tags: ['Company Operations'],
            description: 'Update a company info with the given properties on request body.',
            operationId: 'updateCompany',
            parameters: {
                id: {
                    required: true,
                    $ref: '#/components/schemas/company_id',
                },
            },
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/update_company_payload',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'The company info changed successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/company',
                            },
                        },
                    },
                },
                '400': {
                    description: 'Could not create new resource due to invalid data given',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_400',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Could not find one or more necessary resources or data',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_404',
                            },
                        },
                    },
                },
                '500': {
                    description: 'Could not update resource, an error has occurred',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_500',
                            },
                        },
                    },
                },
            },
        },
        delete: {
            tags: ['Company Operations'],
            description: 'Delete a company that you have created.',
            operationId: 'deleteCompany',
            parameters: {
                id: {
                    required: true,
                    $ref: '#/components/schemas/company_id',
                },
            },
            responses: {
                '200': {
                    description: 'The company was deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/company',
                            },
                        },
                    },
                },
                '400': {
                    description: 'Could not delete resource due to invalid data given',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_400',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Could not find one or more necessary resources or data',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_404',
                            },
                        },
                    },
                },
                '500': {
                    description: 'Could not delete resource, an error has occurred',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_500',
                            },
                        },
                    },
                },
            },
        },
    },
};
