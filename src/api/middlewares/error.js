import { vars } from '../config/vars.js'

export const errorHandler = (err, req, res, next) => {
  const errStatus = err.status || 500
  const errMsg = err.message || 'Something went wrong'
  const errDetails = err.details || undefined
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    details: errDetails,
    stack: vars.environment === 'development' ? err.stack : undefined
  })
}
