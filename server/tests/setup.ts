import path from 'path';
const dotenv = require('dotenv');

// Setup enviromentals
dotenv.config({ path: path.resolve(__dirname, '../src/config/.env.dev') });

module.exports = async () => {  };

