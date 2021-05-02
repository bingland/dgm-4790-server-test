-- CreateTable
CREATE TABLE "CommentType" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "body" TEXT NOT NULL,
    "forumId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentType" ADD FOREIGN KEY ("forumId") REFERENCES "ForumType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
