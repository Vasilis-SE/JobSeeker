import * as redis from 'redis';

export default class RedisClient {
    static client: any;

    static async init() {
        this.client = await redis.createClient({
            password: process.env.REDIS_PASS,
        });
        await this.client.connect();

        this.client.on('error', async (err) => {
            console.error(`Redis connect error: ${err}`);
            process.exit(1);
        });

        console.error(`Redis is connected...`);
    }
}
