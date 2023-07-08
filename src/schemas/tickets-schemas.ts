import { TicketTypeInput } from "@/protocols";
import Joi from "joi";

export const createTicketSchema = Joi.object<TicketTypeInput>({
    ticketTypeId: Joi.number().required(),
});