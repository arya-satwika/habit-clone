ALTER TABLE "checked_blocks" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "checked_blocks" CASCADE;--> statement-breakpoint
ALTER TABLE "routine" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "routine" ADD COLUMN "checked_blocks" json;