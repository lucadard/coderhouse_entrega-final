import { Router } from 'express'
import { isLogged } from '../middlewares/passport.js'
import { UsersController } from './UsersController.js'
const usersController = UsersController.getController()

const usersRouter = Router()

usersRouter.get('/', isLogged, usersController.getUser) // Solo para usuarios logueados
usersRouter.post('/', usersController.registerUser)

export class UsersRouter {
  static getRouter = () => usersRouter
}
