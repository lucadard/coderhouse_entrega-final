import { Router } from 'express'
import { authorize } from '../middlewares/auth.js'
import { ProductsController } from './ProductsController.js'
const productsController = ProductsController.getController()

const productsRouter = Router()

productsRouter.get('/', productsController.getProducts)
productsRouter.get('/:productId', productsController.getProductById)
productsRouter.post(
  '/',
  authorize({ admin: true }),
  productsController.createProduct
)
productsRouter.put(
  '/:productId',
  authorize({ admin: true }),
  productsController.updateProduct
)
productsRouter.delete(
  '/:productId',
  authorize({ admin: true }),
  productsController.deleteProduct
)

export class ProductsRouter {
  static getRouter = () => productsRouter
}
