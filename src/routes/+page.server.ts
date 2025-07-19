import { db } from '$lib/server/db/index';
import { eq, sql } from 'drizzle-orm';
import  { routines, checkedBlocks } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import type { RoutineData } from '../lib/dates';


export const load: PageServerLoad = async ({ cookies }) => {
    try {
        let userId = cookies.get('user');
        if (!userId){
            // make a token
            const token = crypto.randomUUID();
            cookies.set('user', token,{
                path: '/',
                httpOnly: true
            });
            userId = token;

            return { users: userId, routines: [] as RoutineData[] };
        }
        const routineData = await db.query.routines.findMany({
            where: sql`user_id = ${userId}`,
            with: {
                checkedBlocks: true
            }
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