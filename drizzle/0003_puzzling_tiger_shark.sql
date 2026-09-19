ALTER TABLE `leads` MODIFY COLUMN `email` varchar(320);--> statement-breakpoint
ALTER TABLE `leads` ADD `sourceType` enum('website_form','janice_chat') DEFAULT 'website_form' NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `leadSummary` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `supportDetails` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `location` varchar(256);--> statement-breakpoint
ALTER TABLE `leads` ADD `preferredStartTime` varchar(256);--> statement-breakpoint
ALTER TABLE `leads` ADD `expectedDuration` varchar(256);--> statement-breakpoint
ALTER TABLE `leads` ADD `preferredContactTime` varchar(256);--> statement-breakpoint
ALTER TABLE `leads` ADD `relationshipToParticipant` varchar(128);--> statement-breakpoint
ALTER TABLE `leads` ADD `ndisPlanStatus` varchar(256);--> statement-breakpoint
ALTER TABLE `leads` ADD `conversationTranscript` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `zapierDeliveryStatus` enum('not_applicable','pending','delivered','failed') DEFAULT 'not_applicable' NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `zapierDeliveredAt` timestamp;--> statement-breakpoint
ALTER TABLE `leads` ADD `zapierError` varchar(512);