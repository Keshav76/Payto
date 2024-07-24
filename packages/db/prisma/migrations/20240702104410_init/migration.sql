-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('Email', 'Google', 'Github');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Success', 'Failed', 'Processing');

-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('Food', 'Recharge', 'Bill', 'Transportation', 'Entertainment', 'Household', 'Utility', 'Miscellaneous');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "locked" INTEGER NOT NULL DEFAULT 0,
    "auth_type" "AuthType" NOT NULL DEFAULT 'Email',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnRampTransaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'Processing',
    "provider" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "OnRampTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffRampTransaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'Processing',
    "provider" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "OffRampTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "P2PTransaction" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "message" TEXT NOT NULL DEFAULT 'Miscellaneous',
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,
    "category" "TransactionCategory" NOT NULL,

    CONSTRAINT "P2PTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_token_key" ON "OnRampTransaction"("token");

-- CreateIndex
CREATE UNIQUE INDEX "OffRampTransaction_token_key" ON "OffRampTransaction"("token");

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffRampTransaction" ADD CONSTRAINT "OffRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransaction" ADD CONSTRAINT "P2PTransaction_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransaction" ADD CONSTRAINT "P2PTransaction_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
