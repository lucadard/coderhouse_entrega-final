import { config } from '../config/index.js'

export const errorHandler = (err, req, res, next) => {
  const errStatus = err.status || 500
  const errMsg = err.message || 'Something went wrong'
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: config.environment === 'development' ? err.stack : undefined
  })
}
