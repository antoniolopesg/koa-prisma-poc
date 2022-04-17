/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "ownerId_name_unique_constraint" ON "Account"("ownerId", "name");
