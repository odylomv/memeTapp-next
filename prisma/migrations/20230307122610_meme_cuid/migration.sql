/*
  Warnings:

  - The primary key for the `Meme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MemeLike` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_memeId_fkey";

-- DropForeignKey
ALTER TABLE "MemeLike" DROP CONSTRAINT "MemeLike_memeId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "memeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Meme" DROP CONSTRAINT "Meme_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Meme_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Meme_id_seq";

-- AlterTable
ALTER TABLE "MemeLike" DROP CONSTRAINT "MemeLike_pkey",
ALTER COLUMN "memeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MemeLike_pkey" PRIMARY KEY ("userId", "memeId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_memeId_fkey" FOREIGN KEY ("memeId") REFERENCES "Meme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemeLike" ADD CONSTRAINT "MemeLike_memeId_fkey" FOREIGN KEY ("memeId") REFERENCES "Meme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
