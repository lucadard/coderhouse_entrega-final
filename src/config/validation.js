import Joi from 'joi'
import { CustomError } from '../models/CustomError.js'

export function validateData(
  schema,
  data,
  errMsg = 'Data validation failed: '
) {
  // try {
  // Joi.attempt(data, schema, errMsg, {
  //   abortEarly: false,
  //   allowUnknown: true
  // })
  // return true
  const { value, error } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: true
  })
  if (error) {
    const errDetails = error.details.map((field) => ({
      message: field.message,
      key: field.context.key
    }))
    throw new CustomError(errMsg, 400, {
      type: 'Joi validation',
      fields: errDetails
    })
  } else return value
  // }
}
