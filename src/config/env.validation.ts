import { z } from 'zod';

export const envSchema = z.object({
  // APP
  APP_NAME: z.string(),
  APP_URL: z.string(),
  APP_ENV: z.enum(['dev', 'stage', 'prod', 'test']),
  APP_PORT: z.coerce.number().default(3000),
});
