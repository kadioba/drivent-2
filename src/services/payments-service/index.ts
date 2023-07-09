import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import ticketsService from "../tickets-service";
import { prisma } from "@/config";
import { PaymentData } from "@/protocols";

async function getTicketPaymentInfo(ticketId: number, userId: number) {
    const ticket = await ticketsRepository.getTicketById(ticketId)
    if (ticket === null) throw notFoundError();

    const enrollmentId = await enrollmentRepository.getUserEnrollmentId(userId)
    if (ticket.enrollmentId !== enrollmentId.id) throw unauthorizedError();

    const paymentInfo = await paymentsRepository.getTicketPaymentInfo(ticketId)

    return paymentInfo;

}

async function processNewPayment(payment: PaymentData, userId: number) {
    const ticket = await ticketsRepository.getTicketById(payment.ticketId);
    console.log(ticket)
    if (ticket === null) throw notFoundError();

    const enrollmentId = await enrollmentRepository.getUserEnrollmentId(userId)
    if (ticket.enrollmentId !== enrollmentId.id) throw unauthorizedError();

    const paymentComplete = await paymentsRepository.processNewPayment(payment, ticket)

    if(paymentComplete) await ticketsRepository.setTicketAsPaid(payment.ticketId);

    return paymentComplete;
}

const paymentsService = {
    getTicketPaymentInfo,
    processNewPayment,
}

export default paymentsService;