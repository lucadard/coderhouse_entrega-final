import { Router } from 'express'
import { authorize } from '../middlewares/auth.js'
import { OrdersController } from './OrdersController.js'
const ordersController = OrdersController.getController()

const ordersRouter = Router()

ordersRouter.get('/', authorize(), ordersController.getOrdersByUserId)
ordersRouter.post('/', authorize(), ordersController.sendOrder)

export class OrdersRouter {
  static getRouter = () => ordersRouter
}
