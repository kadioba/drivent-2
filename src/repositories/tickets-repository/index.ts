import { prisma } from '@/config';

async function getTicketsType() {
  return prisma.ticketType.findMany();
}

async function getUserTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function createNewTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      updatedAt: new Date(),
      status: 'RESERVED',
    },
  });
}

async function getTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function setTicketAsPaid(ticketId: number) {
  return prisma.ticket.update({
    data: {
      status: 'PAID',
    },
    where: {
      id: ticketId,
    },
  });
}

const ticketsRepository = {
  getTicketsType,
  getUserTickets,
  createNewTicket,
  getTicketById,
  setTicketAsPaid,
};

export default ticketsRepository;
