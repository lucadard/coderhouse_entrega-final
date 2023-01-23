import { Router } from 'express'
import { reqLogger } from '../middlewares/logger.js'
import { authorize } from '../middlewares/auth.js'
import { UsersController } from './UsersController.js'
const usersController = UsersController.getController()

const usersRouter = Router()

usersRouter.use(reqLogger)
usersRouter.get('/', authorize(), usersController.getUser) // Solo para usuarios logueados
usersRouter.post('/', usersController.registerUser)

export class UsersRouter {
  static getRouter = () => usersRouter
}
