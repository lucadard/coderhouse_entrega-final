import Joi from 'joi'

export const cartsSchema = Joi.object({
  id: Joi.string().required(),
  products: Joi.array().default([])
})
