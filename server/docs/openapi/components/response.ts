export default {
    response_status: {
        key: 'status',
        type: 'boolean',
        description: 'The status of the response.',
    },
    response_data: {
        key: 'data',
        type: 'array | object',
        description:
            'This is the response payload. Whenever your are making a request the response might return some data back.',
        example: {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
        },
    },
    response_login_data: {
        key: 'data',
        type: 'object',
        description: 'This is the response payload. Whenever you login successfully.',
        example: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTY0NDc1MjE5MiwiZXhwIjoxNjQ0NzU5MzkyfQ.DNfezJtiGrzMtMEC394leD2ECUlTFgNvBtD72S1JxrE',
            exp: 1644759392,
        },
    },
    token: {
        key: 'token',
        type: 'string',
        description: 'JSON web token that is used to communicate with the API',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTY0NDc1MjE5MiwiZXhwIjoxNjQ0NzU5MzkyfQ.DNfezJtiGrzMtMEC394leD2ECUlTFgNvBtD72S1JxrE',
    },
    expiration: {
        key: 'exp',
        type: 'integer',
        description: 'The expiration timestamp of a JWT.',
        example: 1644759392,
    },
    response_message: {
        key: 'message',
        type: 'string',
        description: 'An error message describing what went wrong.',
        example: 'Missing body from request...',
    },
    response_errorcode: {
        key: 'errorCode',
        type: 'string',
        description: 'A unique error code to identify the type of error.',
        example: 'es1',
    },
    response_httpcode: {
        key: 'httpCode',
        type: 'integer',
        description: 'The HTTP error code of the response.',
        example: '404',
    },
    response_property: {
        key: 'property',
        type: 'string',
        description: 'A property that it is used to identify what property from request is missing.',
        example: 'username',
    },
    response_expected: {
        key: 'expected',
        type: 'string',
        description:
            'This is used mostly on errors which the data type of the request data are invalid. The expected property specifies what the request data should be.',
        example: 'integer',
    },
    response_success: {
        type: 'object',
        description: 'A successfull response object that will return back to the caller.',
        required: ['status', 'data'],
        properties: {
            status: {
                $ref: '#/components/schemas/response_status',
            },
            data: {
                $ref: '#/components/schemas/response_data',
            },
        },
        example: {
            status: true,
            data: {
                id: 1,
                username: 'testuser1',
                created_at: 1644757997,
            },
        },
    },
    response_login_success: {
        type: 'object',
        description: 'Response object from successfull login that contain token.',
        required: ['status', 'data'],
        properties: {
            status: {
                $ref: '#/components/schemas/response_status',
            },
            data: {
                $ref: '#/components/schemas/response_login_data',
            },
        },
        example: {
            status: true,
            data: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTY0NDc1MjE5MiwiZXhwIjoxNjQ0NzU5MzkyfQ.DNfezJtiGrzMtMEC394leD2ECUlTFgNvBtD72S1JxrE',
                exp: 1644759392,
            },
        },
    },
    response_failed_400: {
        type: 'object',
        description: 'Failed response object that occures when the request data are invalid.',
        required: ['status', 'message', 'errorCode', 'httpCode'],
        properties: {
            status: {
                $ref: '#/components/schemas/response_status',
            },
            message: {
                $ref: '#/components/schemas/response_message',
            },
            errorCode: {
                $ref: '#/components/schemas/response_errorcode',
            },
            httpCode: {
                $ref: '#/components/schemas/response_httpcode',
            },
            property: {
                $ref: '#/components/schemas/response_property',
            },
            expected: {
                $ref: '#/components/schemas/response_expected',
            },
        },
        example: {
            status: false,
            message: 'Invalid property type give...',
            errorCode: 'ev2',
            httpCode: 401,
        },
    },
    response_failed_404: {
        type: 'object',
        description: 'Failed response that occures whenever something is missing from the request data.',
        required: ['status', 'message', 'errorCode', 'httpCode'],
        properties: {
            status: {
                $ref: '#/components/schemas/response_status',
            },
            message: {
                $ref: '#/components/schemas/response_message',
            },
            errorCode: {
                $ref: '#/components/schemas/response_errorcode',
            },
            httpCode: {
                $ref: '#/components/schemas/response_httpcode',
            },
            property: {
                $ref: '#/components/schemas/response_property',
            },
            expected: {
                $ref: '#/components/schemas/response_expected',
            },
        },
        example: {
            status: false,
            message: 'Property is missing from the request...',
            errorCode: 'ev1',
            httpCode: 404,
        },
    },
    response_failed_500: {
        type: 'object',
        description: 'Fatal response error that occures whenever a process fails.',
        required: ['status', 'message', 'errorCode', 'httpCode'],
        properties: {
            status: {
                $ref: '#/components/schemas/response_status',
            },
            message: {
                $ref: '#/components/schemas/response_message',
            },
            errorCode: {
                $ref: '#/components/schemas/response_errorcode',
            },
            httpCode: {
                $ref: '#/components/schemas/response_httpcode',
            },
            property: {
                $ref: '#/components/schemas/response_property',
            },
            expected: {
                $ref: '#/components/schemas/response_expected',
            },
        },
        example: {
            status: false,
            message: 'Could not render hash for password...',
            errorCode: 'es1',
            httpCode: 500,
        },
    },
};
