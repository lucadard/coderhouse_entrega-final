import { CustomError } from '../models/CustomError.js'

export function validateData(
  schema,
  data,
  errMsg = 'Data validation failed: '
) {
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
