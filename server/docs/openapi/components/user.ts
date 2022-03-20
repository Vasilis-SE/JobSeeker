export default {
    user_id: {
        key: 'id',
        type: 'integer',
        description: 'The id of the user.',
        example: 1,
    },
    user_username: {
        key: 'username',
        type: 'string',
        description: 'The username of the user.',
        example: 'mhiers0',
    },
    user_password: {
        key: 'password',
        type: 'string',
        description: 'The password of the user.',
        example: '1234552pass',
    },
    user_created_at: {
        key: 'created_at',
        type: 'integer',
        description: 'The timestamp of the user creation.',
        example: 1644757997,
    },
    user: {
        type: 'object',
        description: 'This is a user entity that contains all the necessary resources.',
        properties: {
            id: {
                $ref: '#/components/schemas/user_id',
            },
            username: {
                $ref: '#/components/schemas/user_username',
            },
            password: {
                $ref: '#/components/schemas/user_password',
            },
            created_at: {
                $ref: '#/components/schemas/user_creation_stamp',
            },
        },
        example: {
            id: 1,
            username: 'mhiers0',
            created_at: 1644751289,
        },
    },
    create_user_payload: {
        type: 'object',
        description: 'User resource to create a new user.',
        required: ['username', 'password'],
        properties: {
            username: {
                $ref: '#/components/schemas/user_username',
            },
            password: {
                $ref: '#/components/schemas/user_password',
            },
        },
        example: {
            username: 'testuser1',
            password: '12345pass',
        },
    },
    user_login: {
        type: 'object',
        description: 'User resource that contains an username and a plain password to be used for login purposes.',
        properties: {
            username: {
                $ref: '#/components/schemas/user_username',
            },
            password: {
                $ref: '#/components/schemas/user_password',
            },
        },
    },
    user_logout: {
        type: 'object',
        description: 'User resource that contains only the user id of the user that logged out.',
        properties: {
            response_success: {
                $ref: '#/components/schemas/response_success',
            },
        },
    },
};
