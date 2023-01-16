import Dao from '../databases/Dao.js'
import { CartSchema } from './schemas/cartSchema.js'

const cartsDao = new Dao('carts', CartSchema)

export class CartsDaoFactory {
  static getDao = () => cartsDao
}
