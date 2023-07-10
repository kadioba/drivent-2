import Joi from 'joi';
import { TicketTypeInput } from '@/protocols';

export const createTicketSchema = Joi.object<TicketTypeInput>({
  ticketTypeId: Joi.number().required(),
});
