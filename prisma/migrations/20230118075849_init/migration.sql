-- CreateTable
CREATE TABLE "Studt" (
    "id" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,

    CONSTRAINT "Studt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "bookName" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_bookId_key" ON "Books"("bookId");

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Studt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
