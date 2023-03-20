/*
  Warnings:

  - You are about to drop the column `itemId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `SubscriptionHistories` table. All the data in the column will be lost.
  - Added the required column `item` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item` to the `SubscriptionHistories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "itemId",
ADD COLUMN     "item" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionHistories" DROP COLUMN "itemId",
ADD COLUMN     "item" JSONB NOT NULL;
