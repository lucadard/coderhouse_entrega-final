import dotenv from 'dotenv'
dotenv.config()

checkVars()
function checkVars() {
  const notSetVars = []
  if (!process.env.MONGO_URL) notSetVars.push('MONGO_URL')
  if (!process.env.JWT_SECRET) notSetVars.push('JWT_SECRET')
  if (!process.env.EMAIL_SENDER_USER) notSetVars.push('EMAIL_SENDER_USER')
  if (!process.env.EMAIL_SENDER_PASS) notSetVars.push('EMAIL_SENDER_PASS')
  if (notSetVars.length > 0)
    throw new Error(
      'You need to set these environment variables: ' + notSetVars
    )
}

export const config = {
  admins: ['admin@admin.com'],
  staticPath: {
    folder: 'static',
    url: '/public',
    defaultProfilePicture: '/public/defaults/no-pfp.jpeg',
    defaultProductPicture: '/public/defaults/no-prod.jpeg'
  },
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  environment: process.env.NODE_ENV || 'development',
  emailSender: {
    user: process.env.EMAIL_SENDER_USER,
    pass: process.env.EMAIL_SENDER_PASS
  }
}
