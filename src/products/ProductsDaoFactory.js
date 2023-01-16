import Dao from '../databases/Dao.js'
import { ProductSchema } from './schemas/productSchema.js'

const productsDao = new Dao('products', ProductSchema)

export class ProductsDaoFactory {
  static getDao = () => productsDao
}
