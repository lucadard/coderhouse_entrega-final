import { Router } from 'express'
import { isLogged } from '../middlewares/passport.js'
import { OrdersController } from './OrdersController.js'
const ordersController = OrdersController.getController()

const ordersRouter = Router()

ordersRouter.get('/', isLogged, ordersController.getOrdersByUserId)
ordersRouter.post('/', isLogged, ordersController.sendOrder)

export class OrdersRouter {
  static getRouter = () => ordersRouter
}
