-- CreateTable
CREATE TABLE `ClassData` (
    `name` ENUM('A', 'B', 'C') NOT NULL,
    `premiAmount` INTEGER NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
