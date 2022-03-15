import Server from './server';
import PostgreSQL from '../connections/postgres';
import RedisClient from '../connections/redis';

// Load enviromentals
require('../bin/env');

// Initialize connections
PostgreSQL.init();
RedisClient.init();

const server: Server = new Server();
server.run(Number(process.env.PORT), () => console.log(`Server started on port: ${process.env.PORT}`));
