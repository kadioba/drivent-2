import { getTicketPaymentInfo, processNewPayment } from "@/controllers/payments-contoller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";


const paymentsRouter = Router();

paymentsRouter
    .get('/', authenticateToken, getTicketPaymentInfo)
    .post('/process', authenticateToken, processNewPayment)

export { paymentsRouter };