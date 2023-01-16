import Dao from '../databases/Dao.js'
import { CartSchema } from './schemas/cartSchema.js'

const carts = new Dao('carts', CartSchema)

export class CartsDaoFactory {
  static getDao = () => carts
}
