ALTER TABLE "user" ADD COLUMN "quiz_completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "quiz_score" integer;