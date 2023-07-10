import { Router } from 'express';
import { createNewTicket, getTicketsType, getUserTickets } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .get('/types', authenticateToken, getTicketsType)
  .get('/', authenticateToken, getUserTickets)
  .post('/', authenticateToken, validateBody(createTicketSchema), createNewTicket);

export { ticketsRouter };
