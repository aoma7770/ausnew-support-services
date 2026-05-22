CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`phone` varchar(64) NOT NULL,
	`email` varchar(320) NOT NULL,
	`message` text,
	`sourcePage` varchar(256) NOT NULL,
	`ndisNumber` varchar(64),
	`supportType` varchar(128),
	`status` enum('new','contacted','qualified','converted','not_suitable') NOT NULL DEFAULT 'new',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
