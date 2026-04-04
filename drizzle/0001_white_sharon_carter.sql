CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`arvowId` varchar(64) NOT NULL,
	`title` varchar(512) NOT NULL,
	`slug` varchar(512) NOT NULL,
	`content` text NOT NULL,
	`contentMarkdown` text,
	`thumbnail` varchar(1024),
	`thumbnailAltText` varchar(512),
	`metaDescription` varchar(512),
	`keywordSeed` varchar(256),
	`languageCode` varchar(16) DEFAULT 'en',
	`publishedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_arvowId_unique` UNIQUE(`arvowId`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
