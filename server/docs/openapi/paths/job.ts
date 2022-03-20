export = {
    '/api/v1/job': {
        post: {
            tags: ['Job Operations'],
            description: 'Create new job with the given properties on request body.',
            operationId: 'createJob',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/create_job_payload',
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'The job was created and stored successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_success',
                            },
                        },
                    },
                },
                '400': {
                    description: 'Could not create new job due to invalid data given on request body',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_400',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Could not find one or more necessary resources to create the job',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/response_failed_404',
                            },
                        },
                    },
                },
                '500': {
                    description: 'Could not create new job, something went wrong with the process',
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
    '/api/v1/job/{id}': {
        patch: {
            tags: ['Job Operations'],
            description: 'Update a job info with the given properties on request body.',
            operationId: 'updateJob',
            parameters: {
                id: {
                    required: true,
                    $ref: '#/components/schemas/job_id',
                },
            },
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/update_job_payload',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'The job info changed successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/job',
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
            tags: ['Job Operations'],
            description: 'Delete a job that you have created.',
            operationId: 'deleteJob',
            parameters: {
                id: {
                    required: true,
                    $ref: '#/components/schemas/job_id',
                },
            },
            responses: {
                '200': {
                    description: 'The job was deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/job',
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
    
}