import { db } from '$lib/server/db/index';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { RoutineData } from '$lib/dates';


export const load: PageServerLoad = async ({ cookies }) => {
    try {
        let userId = cookies.get('user');
        if (!userId){
            userId = Math.random().toString(36).substring(2, 15);
            cookies.set('user', userId,{
                path: '/',
                httpOnly: true
            });

            return { users: userId, routines: [] as RoutineData[] };
        }
        const routineData = await db.query.routines.findMany({
            where: sql`user_id = ${userId}`,
        })
        return { 
            users: userId,
            routines: routineData
        };
    } catch (error) {
        console.error(error);
        return { users: null };
    }
}   