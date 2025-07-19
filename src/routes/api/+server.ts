import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { checkedBlocks, routines } from "$lib/server/db/schema";
import { check } from "drizzle-orm/gel-core";

export const POST: RequestHandler = async ({ request }) => {
    const { routine,users } = await request.json();
    const result = await db.insert(routines).values({
        id: 1010,
        title: routine.title,
        startAt: routine.startDate,
        userId: users
    });
    await db.insert(checkedBlocks).values({
        routineId: routine.id,
        date: routine.startDate
    });

    return json("Routine created successfully");
}