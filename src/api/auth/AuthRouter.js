import { Router } from 'express'
import { AuthController } from './AuthController.js'
const authController = AuthController.getController()

const authRouter = Router()

authRouter.post('/', authController.login)

export class AuthRouter {
  static getRouter = () => authRouter
}
