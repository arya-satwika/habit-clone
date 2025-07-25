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
        else {
            const unfilteredRoutines = await db.query.routinesTable.findMany({
                where: sql`user_id = ${userId}`
            })
            const routineData: RoutineData[] = unfilteredRoutines.map(routine => ({
                id: routine.id,
                title: routine.title,
                startAt: routine.startAt,
                userId: routine.userId,
                checkedBlocks: new Map<string, boolean>(Object.entries(routine.checkedBlocks as Record<string, boolean>)),
                icon: routine.icon as 'psychology'|'vape_free'|'pill'|'self_improvement'|'account_balance_wallet'
            }));
            return { 
                users: userId,
                routines: routineData
            };
        }
    } catch (error) {
        console.error(error);
        return { users: null };
    }
}   