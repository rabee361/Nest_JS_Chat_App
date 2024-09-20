/*
  Warnings:

  - You are about to drop the column `attachId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_attachId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "attachId";
