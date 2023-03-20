/*
  Warnings:

  - Made the column `item` on table `PurchaseHistories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PurchaseHistories" ALTER COLUMN "item" SET NOT NULL;
