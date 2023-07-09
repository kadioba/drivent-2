import { getTicketPaymentInfo, processNewPayment } from "@/controllers/payments-contoller";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentSchema } from "@/schemas/payments-schemas";
import { Router } from "express";


const paymentsRouter = Router();

paymentsRouter
    .get('/', authenticateToken, getTicketPaymentInfo)
    .post('/process', authenticateToken, validateBody(paymentSchema), processNewPayment)

export { paymentsRouter };