/*
  Warnings:

  - You are about to drop the column `countity` on the `SubscriptionHistories` table. All the data in the column will be lost.
  - You are about to drop the column `flavor` on the `SubscriptionHistories` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `SubscriptionHistories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SubscriptionHistories` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `SubscriptionHistories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubscriptionHistories" DROP COLUMN "countity",
DROP COLUMN "flavor",
DROP COLUMN "imageUrl",
DROP COLUMN "name",
DROP COLUMN "price";
