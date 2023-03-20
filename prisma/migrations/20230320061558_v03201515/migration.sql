-- CreateTable
CREATE TABLE "PurchaseHistories" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "item" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseHistories_pkey" PRIMARY KEY ("id")
);
