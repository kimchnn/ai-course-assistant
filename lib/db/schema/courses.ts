import { text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { nanoid } from "@/lib/utils";
import { sql } from "drizzle-orm";

export const courses = pgTable("courses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
});
