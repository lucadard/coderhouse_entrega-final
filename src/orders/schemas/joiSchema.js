import Joi from 'joi'

export const orderSchema = Joi.object({
  id: Joi.string().required(),
  clientId: Joi.string().required(),
  prods: Joi.array().default([]),
  createdAt: Joi.date().default(Date.now)
})
