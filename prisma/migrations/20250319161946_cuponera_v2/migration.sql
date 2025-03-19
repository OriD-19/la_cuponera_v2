/*
  Warnings:

  - You are about to drop the column `couponId` on the `Client` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `couponState` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN "sold" INTEGER DEFAULT 0;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "DUI" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("DUI", "email", "id", "phone", "userId") SELECT "DUI", "email", "id", "phone", "userId" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_DUI_key" ON "Client"("DUI");
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");
CREATE TABLE "new_Coupon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "couponState" TEXT NOT NULL,
    "offerId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Coupon_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Coupon_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coupon" ("code", "createdAt", "id", "offerId", "updatedAt") SELECT "code", "createdAt", "id", "offerId", "updatedAt" FROM "Coupon";
DROP TABLE "Coupon";
ALTER TABLE "new_Coupon" RENAME TO "Coupon";
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
