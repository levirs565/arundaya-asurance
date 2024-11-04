/*
  Warnings:

  - You are about to drop the column `bithDate` on the `user` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `claim` MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` CHANGE COLUMN `bithDate` birthDate DATETIME(3) NOT NULL;

