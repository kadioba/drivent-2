import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { PaymentData } from '@/protocols';

async function getTicketPaymentInfo(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function processNewPayment(
  payment: PaymentData,
  ticket: Ticket & {
    TicketType: TicketType;
  },
) {
  return prisma.payment.create({
    data: {
      ticketId: payment.ticketId,
      value: ticket.TicketType.price,
      cardIssuer: payment.cardData.issuer,
      cardLastDigits: payment.cardData.number.slice(-4),
    },
  });
}

const paymentsRepository = {
  getTicketPaymentInfo,
  processNewPayment,
};

export default paymentsRepository;
