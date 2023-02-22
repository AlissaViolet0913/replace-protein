/*
  Warnings:

  - A unique constraint covering the columns `[imageUrl]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Item_imageUrl_key" ON "Item"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
