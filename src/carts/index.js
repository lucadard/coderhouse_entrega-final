import { Repository } from '../databases/Repository.js'
import { CartsDaoFactory } from './CartsDaoFactory.js'
import { CartsRouter } from './CartsRouter.js'
import { CartsService } from './CartsService.js'
import { Cart } from './models/Cart.js'

export const cartsRouter = CartsRouter.getRouter()

const cartsDao = CartsDaoFactory.getDao()
const cartsRepository = new Repository(cartsDao, Cart)
export const cartsService = new CartsService(cartsRepository)
