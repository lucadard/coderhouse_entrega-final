import { Router } from 'express'
import { reqLogger } from '../middlewares/logger.js'
import { authorize } from '../middlewares/auth.js'
import { OrdersController } from './OrdersController.js'
const ordersController = OrdersController.getController()

const ordersRouter = Router()

ordersRouter.use(reqLogger)
ordersRouter.get('/', authorize(), ordersController.getOrdersByUserId)
ordersRouter.post('/', authorize(), ordersController.sendOrder)

export class OrdersRouter {
  static getRouter = () => ordersRouter
}
