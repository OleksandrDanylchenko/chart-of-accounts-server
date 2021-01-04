import { registerAs } from '@nestjs/config';

const port = parseInt(process.env.PORT || process.env.APP_PORT, 10);

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  port,
  env: process.env.NODE_ENV
}));
