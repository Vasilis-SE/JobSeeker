import components from './components';
import paths from './paths';
import servers from './servers';

export = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'JobSeeker',
        summary: 'Simple REST API that handles job openings and promotions.',
        description:
            'This is a template project demonstrating the usage and the architectural design of a simple REST API for the purpose of handling user registration, login, logout etc...',
        contact: {
            name: 'API Creator',
            email: 'vasilis.tris@gmail.com',
        },
        license: {
            name: 'MIT License',
            url: 'https://www.mit.edu/~amini/LICENSE.md',
        },
    },
    servers: servers,
    tags: [
        {
            name: 'User Operations',
        },
        {
            name: 'Company Operations',
        },
        {
            name: 'Job Operations',
        },
    ],
    paths: paths,
    components: components,
};
