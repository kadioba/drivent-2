import Joi from 'joi';
import { CardData, PaymentData } from '@/protocols';

export const cardSchema = Joi.object<CardData>({
  issuer: Joi.string().required(),
  number: Joi.string().required(),
  name: Joi.string().required(),
  expirationDate: Joi.string().required(),
  cvv: Joi.string().required(),
});

export const paymentSchema = Joi.object<PaymentData>({
  ticketId: Joi.number().integer().required(),
  cardData: cardSchema.required(),
});
