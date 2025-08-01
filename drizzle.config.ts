import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './migrations',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.DATABASE_URL! }
});
