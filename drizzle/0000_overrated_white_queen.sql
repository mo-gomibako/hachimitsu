CREATE TABLE `attendances_of_avatars_on_dates` (
	`answer` text NOT NULL,
	`note` text,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`avatar_id` integer NOT NULL,
	`date_id` integer NOT NULL,
	PRIMARY KEY(`avatar_id`, `date_id`),
	FOREIGN KEY (`avatar_id`) REFERENCES `avatars`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`date_id`) REFERENCES `dates`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `avatars` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`calendar` integer NOT NULL,
	FOREIGN KEY (`calendar`) REFERENCES `calendars`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `calendars` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`last_edited_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`owner_id` integer NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `capability_urls` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`expired_at` text NOT NULL,
	`calendar` integer NOT NULL,
	FOREIGN KEY (`calendar`) REFERENCES `calendars`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `dates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`start_at` text NOT NULL,
	`end_at` text,
	`calendar` integer NOT NULL,
	FOREIGN KEY (`calendar`) REFERENCES `calendars`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
