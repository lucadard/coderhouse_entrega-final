import dotenv from 'dotenv'
dotenv.config()

checkVars()
function checkVars() {
  const notSetVars = []
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
  mongoUrl: 'mongodb://localhost:27017/coder',
  staticPath: {
    folder: 'static',
    url: '/public',
    defaultProfilePicture: '/public/images/no_profile_photo.jpeg',
    defaultProductPicture: '/public/images/no_product_photo.jpeg'
  },
  jwtSecret: process.env.JWT_SECRET,
  environment: process.env.NODE_ENV || 'development',
  emailSender: {
    user: process.env.EMAIL_SENDER_USER,
    pass: process.env.EMAIL_SENDER_PASS
  }
}
