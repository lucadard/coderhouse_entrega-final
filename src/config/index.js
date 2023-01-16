import dotenv from 'dotenv'
dotenv.config()

export const config = {
  admins: ['admin'],
  mongoUrl: 'mongodb://localhost:27017/coder?authSource=admin',
  jwtSecret: process.env.JWT_SECRET,
  staticPath: 'public/images',
  environment: process.env.NODE_ENV
}
