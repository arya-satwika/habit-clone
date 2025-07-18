import { db } from '$lib/server/db/index';
import { usersTable } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        cookieStore
        const users = await db.insert(usersTable).values({ id: 1, name: 'John Doe' });
        return { user: users };
    } catch (error) {
        console.error('Error loading data:', error);
        return { user: null };
    }
}   