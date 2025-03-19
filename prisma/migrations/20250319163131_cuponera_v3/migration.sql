/*
  Warnings:

  - You are about to drop the column `email` on the `Client` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phone" TEXT NOT NULL,
    "DUI" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("DUI", "id", "phone", "userId") SELECT "DUI", "id", "phone", "userId" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_DUI_key" ON "Client"("DUI");
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
