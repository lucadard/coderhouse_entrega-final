import { Repository } from '../databases/Repository.js'
import { ProductsDaoFactory } from './ProductsDaoFactory.js'
import { ProductsRouter } from './ProductsRouter.js'
import { ProductsService } from './ProductsService.js'
import { Product } from './models/Product.js'

export const productsRouter = ProductsRouter.getRouter()

const productsDao = ProductsDaoFactory.getDao()
const productsRepository = new Repository(productsDao, Product)
export const productsService = new ProductsService(productsRepository)
