import { Request, Response } from "express";
import { AuthenticatedRequest } from "./tickets-controller";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import { PaymentData } from "@/protocols";

export async function getTicketPaymentInfo(req: AuthenticatedRequest, res: Response) {
    const ticketId: number = Number(req.query.ticketId)
    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST)

    const userId: number = Number(req.userId)
    try {
        const paymentInfo = await paymentsService.getTicketPaymentInfo(ticketId, userId);
        res.status(httpStatus.OK).send(paymentInfo)
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        if (error.name === 'UnauthorizedError') {
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}


export async function processNewPayment(req: AuthenticatedRequest, res: Response) {
    const payment = req.body as PaymentData;
    const userId: number = req.userId;

    try {
        const paymentComplete = await paymentsService.processNewPayment(payment, userId)
        console.log(paymentComplete)
        res.status(httpStatus.OK).send(paymentComplete);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        if (error.name === 'UnauthorizedError') {
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}