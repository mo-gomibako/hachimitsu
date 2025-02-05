import { relations, sql } from "drizzle-orm";
import { sqliteTable, int, text, primaryKey } from "drizzle-orm/sqlite-core";

export const users_ = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export const usersRelations = relations(users_, ({ many }) => ({
  calendars: many(calendars_),
}));

export const calendars_ = sqliteTable("calendars", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  lastEditedAt: text("last_edited_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),

  ownerId: int("owner_id")
    .notNull()
    .references(() => users_.id),
});

export const calendarsRelations = relations(calendars_, ({ one, many }) => ({
  owner: one(users_, {
    fields: [calendars_.ownerId],
    references: [users_.id],
  }),
  dates: many(dates_),
  avatars: many(avatars_),
}));

export const capabilityUrls_ = sqliteTable("capability_urls", {
  id: int().primaryKey({ autoIncrement: true }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  expiredAt: text("expired_at").notNull(),

  calendarId: int("calendar")
    .notNull()
    .references(() => calendars_.id),
});

export const capabilityUrlsRelations = relations(
  capabilityUrls_,
  ({ one }) => ({
    calendar: one(calendars_, {
      fields: [capabilityUrls_.calendarId],
      references: [calendars_.id],
    }),
  }),
);

export const avatars_ = sqliteTable("avatars", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),

  calendarId: int("calendar")
    .notNull()
    .references(() => calendars_.id),
});

export const avatarsRelations = relations(avatars_, ({ one, many }) => ({
  calendar: one(calendars_, {
    fields: [avatars_.calendarId],
    references: [calendars_.id],
  }),
  attendances: many(attendancesOfAvatarsOnDates_),
}));

export const dates_ = sqliteTable("dates", {
  id: int().primaryKey({ autoIncrement: true }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  startAt: text("start_at").notNull(),
  endAt: text("end_at"),

  calendarId: int("calendar")
    .notNull()
    .references(() => calendars_.id),
});

export const datesRelations = relations(dates_, ({ one, many }) => ({
  calendar: one(calendars_, {
    fields: [dates_.calendarId],
    references: [calendars_.id],
  }),
  attendances: many(attendancesOfAvatarsOnDates_),
}));

export const attendancesOfAvatarsOnDates_ = sqliteTable(
  "attendances_of_avatars_on_dates",
  {
    answer: text({ enum: ["yes", "no", "maybe"] }).notNull(),
    note: text(),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`)
      .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

    avatarId: int("avatar_id")
      .notNull()
      .references(() => avatars_.id),
    dateId: int("date_id")
      .notNull()
      .references(() => dates_.id),
  },
  (t) => [primaryKey({ columns: [t.avatarId, t.dateId] })],
);

export const attendancesOfAvatarsOnDatesRelations = relations(
  attendancesOfAvatarsOnDates_,
  ({ one }) => ({
    avatar: one(avatars_, {
      fields: [attendancesOfAvatarsOnDates_.avatarId],
      references: [avatars_.id],
    }),
    date: one(dates_, {
      fields: [attendancesOfAvatarsOnDates_.dateId],
      references: [dates_.id],
    }),
  }),
);
