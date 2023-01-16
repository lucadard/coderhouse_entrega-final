import Dao from '../databases/Dao.js'
import { OrderSchema } from './schemas/orderSchema.js'

const ordersDao = new Dao('orders', OrderSchema)

export class OrdersDaoFactory {
  static getDao = () => ordersDao
}
