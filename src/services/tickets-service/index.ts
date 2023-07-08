import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsType() {
    const types = await ticketsRepository.getTicketsType()
    return types;
};

async function getUserTickets(userId: number) {
    const enrollmentId = await enrollmentRepository.getUserEnrollmentId(userId);
    if (enrollmentId === null) throw notFoundError();

    const tickets = await ticketsRepository.getUserTickets(enrollmentId.id)
    if (tickets === null) throw notFoundError();
    return tickets;
}

async function createNewTicket(userId: number, ticketTypeId: number) {

    const enrollmentId = await enrollmentRepository.getUserEnrollmentId(userId);
    if (enrollmentId === null) throw notFoundError();

    await ticketsRepository.createNewTicket(ticketTypeId, enrollmentId.id);

    const createdTicket = await ticketsRepository.getUserTickets(enrollmentId.id)
    if (createdTicket === null) throw notFoundError();

    return createdTicket;
}

const ticketsService = {
    getTicketsType,
    getUserTickets,
    createNewTicket,
};

export default ticketsService;