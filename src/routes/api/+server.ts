import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { eq } from 'drizzle-orm/expressions';
import { routinesTable } from "$lib/server/db/schema";

export const POST: RequestHandler = async ({ request }) => {
    const { routinesJson } = await request.json();
    await db
    .insert(routinesTable).values({
        id: routinesJson.id,
        title: routinesJson.title,
        startAt: routinesJson.startAt,
        userId: routinesJson.userId,
        checkedBlocks: routinesJson.checkedBlocks,
        icon: routinesJson.icon
    })
    .onConflictDoUpdate({
        target: routinesTable.id,
        set: {
            title: routinesJson.title,
            startAt: routinesJson.startAt,
            userId: routinesJson.userId,
            checkedBlocks: routinesJson.checkedBlocks,
            icon: routinesJson.icon
        }
    });

    return json({ message: "Routine saved successfully" });
}

export const DELETE: RequestHandler = async ({ request }) => {
    const { id } = await request.json();
    await db.delete(routinesTable).where(eq(routinesTable.id, id));
    return json({ message: 'Routine deleted successfully' });
}
