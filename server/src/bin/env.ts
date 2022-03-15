import arg from 'arg';
import path from 'path';
const args = arg({ '--env': String });
let confFile = '.env';
if (args['--env'] == 'dev') confFile = '.env.dev';
require('dotenv').config({ path: path.join(__dirname, `../config/${confFile}`) });
