export default {
    company_id: {
        key: 'id',
        type: 'integer',
        description: 'The id of the company.',
        example: 1,
    },
    company_userid: {
        key: 'userid',
        type: 'integer',
        description: 'The id of the user that created the company.',
        example: 1,
    },
    company_name: {
        key: 'name',
        type: 'string',
        description: 'The name of the company.',
        example: 'Stark Corp',
    },
    company_created_at: {
        key: 'created_at',
        type: 'integer',
        description: 'An epoch timestamp of which the company was created.',
        example: 1644757997,
    },
    company_deleted_at: {
        key: 'deleted_at',
        type: 'integer',
        description: 'An epoch timestamp of which the company was soft deleted.',
        example: 1644757997,
    },
    company_tax_number: {
        key: 'tax_number',
        type: 'integer',
        description: 'A 9 digit tax company identification number.',
        example: 876703192,
    },
    company: {
        type: 'object',
        description: 'A single company resource with all its data.',
        properties: {
            id: {
                $ref: '#/components/schemas/company_id',
            },
            userid: {
                $ref: '#/components/schemas/company_userid',
            },
            name: {
                $ref: '#/components/schemas/company_name',
            },
            created_at: {
                $ref: '#/components/schemas/company_created_at',
            },
            deleted_at: {
                $ref: '#/components/schemas/company_deleted_at',
            },
            tax_number: {
                $ref: '#/components/schemas/company_tax_number',
            },
        },
        example: {
            id: 1,
            userid: 1,
            name: "Stark Corp",
            created_at: 1647772293,
            deleted_at: 1647772293,
            tax_number: 876703192,
        },
    },
    create_company_payload: {
        type: 'object',
        description: 'The necessary payload in order to create a new company.',
        required: ['name', 'tax_number'],
        properties: {
            name: {
                $ref: '#/components/schemas/company_name',
            },
            tax_number: {
                $ref: '#/components/schemas/company_tax_number',
            },
        },
        example: {
            "name": "Stark Corp",
            "tax_number": 123412342
        },
    },
    update_company_payload: {
        type: 'object',
        description: 'The request body payload to update a company info.',
        properties: {
            name: {
                $ref: '#/components/schemas/company_name',
            },
            tax_number: {
                $ref: '#/components/schemas/company_tax_number',
            },
        },
        example: {
            "name": "Stark Corp",
            "tax_number": 123412342
        },
    }
};