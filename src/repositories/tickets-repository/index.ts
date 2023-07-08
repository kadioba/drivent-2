import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function getTicketsType() {
    return prisma.ticketType.findMany()
}



async function getUserTickets(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: {
            enrollmentId
        },
        include: {
            TicketType: true
        }
    })
}

async function createNewTicket(ticketTypeId: number, enrollmentId: number) {
    return prisma.ticket.create({
        data: {
            ticketTypeId,
            enrollmentId,
            updatedAt: new Date(),
            status: "RESERVED"
        }
    })
}

const ticketsRepository = {
    getTicketsType,
    getUserTickets,
    createNewTicket
}

export default ticketsRepository;