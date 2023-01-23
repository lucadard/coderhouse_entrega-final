import Joi from 'joi'

export const userSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().min(3).max(12).required(),
  lastname: Joi.string().min(3).max(20).required(),
  image: Joi.string()
})
