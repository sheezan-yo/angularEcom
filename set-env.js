const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envConfig = {
  production: true,
  url: process.env.NG_APP_BASE_URL || ''
};

fs.writeFileSync('./src/environments/environment.prod.ts',
  `export const environment = ${JSON.stringify(envConfig, null, 2)};`
);