export default {
    job_id: {
        key: 'id',
        type: 'integer',
        description: 'The id of the job.',
        example: 1,
    },
    job_companyid: {
        key: 'companyid',
        type: 'integer',
        description: 'The id of the company that the job is refered to.',
        example: 1,
    },
    job_title: {
        key: 'title',
        type: 'string',
        description: 'The title of the job.',
        example: 'Accounting Executive',
    },
    job_description: {
        key: 'description',
        type: 'string',
        description: 'The description of the job.',
        example: 'Nodejs backend developer with at least 3+ year of working experience.',
    },
    job_created_at: {
        key: 'created_at',
        type: 'integer',
        description: 'An epoch timestamp of which the job was created.',
        example: 1644757997,
    },    
    job_deleted_at: {
        key: 'deleted_at',
        type: 'integer',
        description: 'An epoch timestamp of which the job was soft deleted.',
        example: 1644757997,
    },
    job: {
        type: 'object',
        description: 'A single job resource with all its data.',
        properties: {
            id: {
                $ref: '#/components/schemas/job_id',
            },
            companyid: {
                $ref: '#/components/schemas/job_companyid',
            },
            title: {
                $ref: '#/components/schemas/job_title',
            },
            description: {
                $ref: '#/components/schemas/job_description',
            },
            created_at: {
                $ref: '#/components/schemas/job_created_at',
            },
            deleted_at: {
                $ref: '#/components/schemas/job_deleted_at',
            },
        },
        example: {
            id: 1,
            companyid: 1,
            title: 'Accounting Executive',
            description: 'Nodejs backend developer with at least 3+ year of working experience.',
            created_at: 1647772293,
            deleted_at: 1647772293,
        },
    },
    create_job_payload: {
        type: 'object',
        description: 'The necessary payload in order to create a new job.',
        required: ['name', 'tax_number'],
        properties: {
            companyid: {
                $ref: '#/components/schemas/job_companyid',
            },
            title: {
                $ref: '#/components/schemas/job_title',
            },
            description: {
                $ref: '#/components/schemas/job_description',
            },
        },
        example: {
            "companyid": 2,
            "title": "HR assistant",
            "description": "Mature HR assistant needed for high level tech company."
        },
    },
    update_job_payload: {
        type: 'object',
        description: 'Payload to update an existing job.',
        properties: {
            companyid: {
                $ref: '#/components/schemas/job_companyid',
            },
            title: {
                $ref: '#/components/schemas/job_title',
            },
            description: {
                $ref: '#/components/schemas/job_description',
            },
        },
        example: {
            "title": "HR assistant",
            "description": "Mature HR assistant needed for high level tech company."
        },
    },

};