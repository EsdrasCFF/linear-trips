-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('WAITING_FOR_PAYMENT', 'PAYMENT_CONFIRMED');

-- AlterTable
ALTER TABLE "TripReservation" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'WAITING_FOR_PAYMENT';
