import { Router } from 'express'
import { isLogged } from '../middlewares/passport.js'
import { hasAdminRole } from '../middlewares/roles.js'
import { ProductsController } from './ProductsController.js'
const productsController = ProductsController.getController()

const productsRouter = Router()

productsRouter.get('/', productsController.getProducts)
productsRouter.get('/:productId', productsController.getProductById)
productsRouter.post(
  '/',
  isLogged,
  hasAdminRole,
  productsController.createProduct
)
productsRouter.put(
  '/:productId',
  isLogged,
  hasAdminRole,
  productsController.updateProduct
)
productsRouter.delete(
  '/:productId',
  isLogged,
  hasAdminRole,
  productsController.deleteProduct
)

export class ProductsRouter {
  static getRouter = () => productsRouter
}
