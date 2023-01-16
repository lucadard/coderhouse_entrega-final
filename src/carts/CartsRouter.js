import { Router } from 'express'
import { CartsController } from './CartsController.js'
import { isLogged } from '../middlewares/passport.js'
const cartsController = CartsController.getController()

const cartsRouter = Router()

cartsRouter.get('/', isLogged, cartsController.getCart)
cartsRouter.post('/:productId', isLogged, cartsController.addProductToCart)
cartsRouter.delete('/:productId', isLogged, cartsController.removeFromCart)

export class CartsRouter {
  static getRouter = () => cartsRouter
}
