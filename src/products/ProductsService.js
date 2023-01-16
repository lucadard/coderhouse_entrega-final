import { randomUUID } from 'crypto'
import { CustomError } from '../models/CustomError.js'
import { Product } from './models/Product.js'

export class ProductsService {
  #repository
  constructor(repository) {
    this.#repository = repository
  }
  getAllProducts = async () => {
    const products = await this.#repository.getAll()
    return products.map((product) => product.asDto())
  }
  getProductById = async (productId) => {
    const product = await this.#repository.getById(productId)
    if (!product) throw new CustomError('Product not found.', 404)
    return product.asDto()
  }
  createProduct = async (productData) => {
    const createdProduct = await this.#repository.create(
      new Product({
        ...productData,
        id: randomUUID()
      })
    )
    if (!createdProduct) throw new CustomError('Could not create product.', 500)
    return createdProduct.asDto()
  }
  updateProduct = async (productId, newData) => {
    const updatedProduct = await this.#repository.updateById(productId, {
      ...newData,
      id: productId
    })
    if (!updatedProduct) throw new CustomError('Product not found.', 404)
    return updatedProduct.asDto()
  }
  deleteProduct = async (productId) => {
    const deletedProduct = await this.#repository.deleteById(productId)
    if (!deletedProduct) throw new CustomError('Product not found.', 404)
    return deletedProduct.asDto()
  }
}
