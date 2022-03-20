export default {
    page: {
        key: 'page',
        type: 'integer',
        description: 'The chuck page of the response to fetch. This is used for pagging purposes.',
        example: 1,
    },
    limit: {
        key: 'limit',
        type: 'integer',
        description: 'How many results a response will contain. For example 20 means to fetch 20 resources.',
        example: 20,
    },
    order: {
        key: 'order',
        type: 'sring',
        description: 'Name of the field to order by your results with.',
        example: 'created_at',
    },
    sort: {
        key: 'sort',
        type: 'sring',
        description: 'The sorting method to use when ordering your search results e.g ASC, DESC.',
        example: 'DESC',
    },
};
