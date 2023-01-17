import Joi from 'joi'
import { config } from '../../config/index.js'

export const productSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(120).default(''),
  price: Joi.number().min(1).required(),
  image: Joi.string().default(config.staticPath.defaultProfilePicture)
})

export const updateSchema = Joi.object({
  id: Joi.string().forbidden(),
  name: Joi.string().min(3).max(50),
  description: Joi.string().min(3).max(120),
  price: Joi.number().min(1),
  image: Joi.string()
})
