/*
  Warnings:

  - You are about to drop the column `userId` on the `Place` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_userId_fkey";

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "userId";
