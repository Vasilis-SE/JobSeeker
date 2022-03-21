import { Client } from '@elastic/elasticsearch';

export default class ElasticClient {
    static client: any;

    static async init() {
        this.client = new Client({ 
            node: process.env.ELASTIC_URL,
            auth: {
                username: process.env.ELASTIC_USERNAME,
                password: process.env.ELASTIC_PASS,
            }
        });
        
        this.client
            .ping()
            .then((res) => console.log('Elastic is connected...'))
            .catch((err) => console.error(`Elastic connection error: ${err}`));
    }
}
