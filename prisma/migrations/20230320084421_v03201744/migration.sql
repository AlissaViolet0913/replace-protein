/*
  Warnings:

  - You are about to drop the column `countity` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `flavor` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `item` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `flavor` on the `SubscriptionCart` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `SubscriptionCart` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SubscriptionCart` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `SubscriptionCart` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "countity",
DROP COLUMN "flavor",
DROP COLUMN "imageUrl",
DROP COLUMN "item",
DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "itemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionCart" DROP COLUMN "flavor",
DROP COLUMN "imageUrl",
DROP COLUMN "name",
DROP COLUMN "price";
