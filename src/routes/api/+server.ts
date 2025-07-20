import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { routinesTable } from "$lib/server/db/schema";

export const POST: RequestHandler = async ({ request }) => {
    const { routines } = await request.json();
    console.log("Received routine:", routines);
    await db
    .insert(routinesTable).values({
        id: routines.id,
        title: routines.title,
        startAt: routines.startAt,
        userId: routines.userId,
        checkedBlocks: routines.checkedBlocks
    })
    .onConflictDoUpdate({
        target: routinesTable.id,
        set: {
            title: routines.title,
            startAt: routines.startAt,
            userId: routines.userId,
            checkedBlocks: routines.checkedBlocks
        }
    });

    return json({ message: "Routine saved successfully" });
}