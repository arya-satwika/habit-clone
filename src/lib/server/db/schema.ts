import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});


export const routineTable = pgTable('routine', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  startAt: text('start_at').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const checkedBlocks = pgTable('checked_blocks', {
  routineId: integer('routine_id')
    .notNull()
    .references(() => routineTable.id, { onDelete: 'cascade' }),
  date: text('date').notNull(),
});
