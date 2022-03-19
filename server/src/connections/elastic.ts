import es from 'elasticsearch';

export default class ElasticClient {
    static client: any;

    static async init() {
        this.client = new es.Client({ 
            host: [{
                protocol: 'http',
                host: 'localhost',
                port: process.env.ELASTIC_PORT,
                auth: `${process.env.ELASTIC_USERNAME}:${process.env.ELASTIC_PASS}`,
            }]
        });

        this.client
            .ping()
            .then((res) => console.log('Elastic is connected...'))
            .catch((err) => console.error(`Elastic connection error: ${err}`));
    }
}
