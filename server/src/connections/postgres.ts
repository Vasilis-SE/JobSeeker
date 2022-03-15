import { Client } from 'pg';

export default class PostgreSQL {
    static client: Client;

    static async init() {
        try {
            this.client = new Client({
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS,
                database: process.env.DATABASE_NAME,
            });

            // connecting to database
            await this.client.connect();
            console.info(`Postgres ${process.env.DATABASE_NAME} is connected...`);
        } catch (error) {
            console.error(`Postgres error: ${error}`);
            process.exit(1);
        }
    }

    static async close() {
        await this.client.end();
    }
}
