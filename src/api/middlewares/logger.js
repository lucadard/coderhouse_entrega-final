import { logger } from '../../config/logger.js'

export const reqLogger = (req, res, next) => {
  logger.info(
    `REQUEST -- ${req.method} to ${req.path} -- ${new Date().toLocaleString()}`
  )
  next()
}
