import { db } from '$lib/server/db/index';
import { usersTable } from '$lib/server/db/schema';

export async function load() {
    try {
        const users = await db.insert(usersTable).values({ name: 'John Doe', age: 30, email: 'john@example.com' });
        return { user: users };
    } catch (error) {
        console.error('Error loading data:', error);
        return { user: null };
    }
}   