import { Router } from 'express'
import { reqLogger } from '../middlewares/logger.js'
import { AuthController } from './AuthController.js'
const authController = AuthController.getController()

const authRouter = Router()

authRouter.use(reqLogger)
authRouter.post('/', authController.login)

export class AuthRouter {
  static getRouter = () => authRouter
}
