import { Repository } from '../databases/Repository.js'
import { Order } from './models/Order.js'
import { OrdersRouter } from './OrdersRouter.js'
import { OrdersService } from './OrdersService.js'
import { OrdersDaoFactory } from './OrdersDaoFactory.js'

export const ordersRouter = OrdersRouter.getRouter()

const ordersDao = OrdersDaoFactory.getDao()
const ordersRepository = new Repository(ordersDao, Order)
export const ordersService = new OrdersService(ordersRepository)
