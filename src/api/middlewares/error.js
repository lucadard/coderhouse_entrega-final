import { logger } from '../../config/logger.js'
import { vars } from '../../config/vars.js'

export const errorHandler = (err, req, res, next) => {
  const errorObj = {
    success: false,
    status: err.status || 500,
    message: err.message || 'Something went wrong',
    details: err.details || undefined,
    stack: vars.environment === 'development' ? err.stack : undefined
  }
  logger.error(errorObj)
  res.status(errorObj.status).json(errorObj)
}
