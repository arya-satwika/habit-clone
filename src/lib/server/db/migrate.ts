import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const main = async () => {
    try {
        await migrate(db, { migrationsFolder: './migrations' });
        console.log('Database migration completed successfully.');
    } catch (error) {
        console.error('Error during database migration:', error);
        process.exit(1);
    }
}

main();