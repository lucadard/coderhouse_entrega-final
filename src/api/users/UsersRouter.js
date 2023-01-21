import { Router } from 'express'
import { authorize } from '../middlewares/auth.js'
import { UsersController } from './UsersController.js'
const usersController = UsersController.getController()

const usersRouter = Router()

usersRouter.get('/', authorize({ admin: true }), usersController.getUser) // Solo para usuarios logueados
usersRouter.post('/', usersController.registerUser)

export class UsersRouter {
  static getRouter = () => usersRouter
}
