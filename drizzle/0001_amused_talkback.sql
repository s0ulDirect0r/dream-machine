DROP TABLE "message" CASCADE;--> statement-breakpoint
ALTER TABLE "chat" ADD COLUMN "messages" text NOT NULL;