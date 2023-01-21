import { Router } from 'express'
import { reqLogger } from '../middlewares/logger.js'
import { CartsController } from './CartsController.js'
import { authorize } from '../middlewares/auth.js'
const cartsController = CartsController.getController()

const cartsRouter = Router()

cartsRouter.use(reqLogger)
cartsRouter.get('/', authorize(), cartsController.getCart)
cartsRouter.post('/:productId', authorize(), cartsController.addProductToCart)
cartsRouter.delete('/:productId', authorize(), cartsController.removeFromCart)

export class CartsRouter {
  static getRouter = () => cartsRouter
}
