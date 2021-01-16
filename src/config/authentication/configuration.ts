import { registerAs } from '@nestjs/config';

export default registerAs('authentication', () => ({
  registrationSecret: process.env.JWT_SECRET,
  jwtSecret: process.env.JWT_SECRET
}));
