import { config } from 'dotenv';
import { envSchema } from 'src/config/env.validation';

config();

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv.success === false) {
  console.error('❌ Invalid environment variables', parsedEnv.error.format());
  throw new Error('Invalid environment variables.');
}

export const env = parsedEnv.data;
