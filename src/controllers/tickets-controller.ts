import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export type AuthenticatedRequest = Request & {
    userId: number;
};

export async function getTicketsType(req: Request, res: Response) {
    try {
        const ticketsType = await ticketsService.getTicketsType();
        res.status(httpStatus.OK).send(ticketsType)

    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
    const userId: number = Number(req.userId);

    try {
        const tickets = await ticketsService.getUserTickets(userId);
        res.status(httpStatus.OK).send(tickets);

    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function createNewTicket(req: AuthenticatedRequest, res: Response) {
    const userId: number = Number(req.userId);
    const ticketTypeId: number = Number(req.body.ticketTypeId);

    try {
        const createdTicket = await ticketsService.createNewTicket(userId, ticketTypeId)
        res.status(201).send(createdTicket);

    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}