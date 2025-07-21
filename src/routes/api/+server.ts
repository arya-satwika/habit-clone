import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { routinesTable } from "$lib/server/db/schema";

export const POST: RequestHandler = async ({ request }) => {
    const { routinesJson } = await request.json();
    await db
    .insert(routinesTable).values({
        id: routinesJson.id,
        title: routinesJson.title,
        startAt: routinesJson.startAt,
        userId: routinesJson.userId,
        checkedBlocks: routinesJson.checkedBlocks
    })
    .onConflictDoUpdate({
        target: routinesTable.id,
        set: {
            title: routinesJson.title,
            startAt: routinesJson.startAt,
            userId: routinesJson.userId,
            checkedBlocks: routinesJson.checkedBlocks
        }
    });

    return json({ message: "Routine saved successfully" });
}