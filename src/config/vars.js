import dotenv from 'dotenv'
import { logger } from './logger.js'
dotenv.config()
checkVars()

logger.info(`Environment ${process.env.NODE_ENV || 'production'}`)

export const vars = {
  admins: ['admin@admin.com'],
  staticPath: {
    folder: 'static',
    url: '/public',
    defaultProfilePicture: '/public/defaults/no-pfp.jpeg',
    defaultProductPicture: '/public/defaults/no-prod.jpeg'
  },
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongoUrl:
    process.env.NODE_ENV !== 'development'
      ? process.env.MONGO_PROD_URL
      : process.env.MONGO_DEV_URL,
  emailConfig: {
    user: process.env.EMAIL_SENDER_USER,
    pass: process.env.EMAIL_SENDER_PASS
  }
}

function checkVars() {
  const notSetVars = []
  if (process.env.NODE_ENV !== 'development') {
    if (!process.env.MONGO_PROD_URL) notSetVars.push('MONGO_PROD_URL')
  } else {
    if (!process.env.MONGO_DEV_URL) notSetVars.push('MONGO_DEV_URL')
  }
  if (!process.env.JWT_SECRET) notSetVars.push('JWT_SECRET')
  if (!process.env.EMAIL_SENDER_USER) notSetVars.push('EMAIL_SENDER_USER')
  if (!process.env.EMAIL_SENDER_PASS) notSetVars.push('EMAIL_SENDER_PASS')
  if (notSetVars.length > 0)
    throw new Error(
      'You need to set these environment variables: ' + notSetVars
    )
}
