import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// export const users = pgTable('user', {
// 	id: serial('id').primaryKey(),
// });
export const routines = pgTable('routine', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	startAt: text('start_at').notNull(),
	userId: text('user_id')
		.notNull()
		// .references(() => users.id, { onDelete: 'cascade' }),
});

export const checkedBlocks = pgTable('checked_blocks', {
	routineId: text('routine_id')
		.notNull()
		.references(() => routines.id, { onDelete: 'cascade' }),
	date: text('date').notNull()
});


//---RELATIONS----//
// export const UserRoutineRelations = relations(users, ({many}) => ({
// 	routines: many(routines)
// }))

// export const RoutineUserRelations = relations(routines, ({one}) => ({
// 	user: one(users, {
// 		fields: [routines.userId],
// 		references: [users.id]
// 	})
// }));

export const routinesRelations = relations(routines, ({many}) => ({
	checkedBlocks: many(checkedBlocks)
}));

export const checkedBlocksRelations = relations(checkedBlocks, ({one}) => ({
	routines: one(routines, {
		fields: [checkedBlocks.routineId],
		references: [routines.id]
	})
}));


// export type User = typeof users.$inferSelect;
export type Routine = typeof routines.$inferSelect;
export type CheckedBlock = typeof checkedBlocks.$inferSelect;

