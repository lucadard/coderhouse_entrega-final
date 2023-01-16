import { productsService } from '../products/index.js'
import { Cart } from './models/Cart.js'

export class CartsService {
  #repository
  constructor(repository) {
    this.#repository = repository
  }
  getCart = async (userId) => {
    const cart = await this.#repository.getById(userId)
    if (!cart) throw new CustomError('Cart not found.', 404)
    return cart.asDto()
  }
  createCart = async (userId) => {
    const createdCart = await this.#repository.create(
      new Cart({
        id: userId,
        products: []
      })
    )
    if (!createdCart) throw new CustomError('Could not create cart.', 500)

    return createdCart.asDto()
  }
  addProductToCart = async (userId, productId) => {
    const cart = await this.#repository.getById(userId)
    const productData = await productsService.getProductById(productId)
    cart.addProduct(productData)
    const updatedCart = await this.#repository.updateById(userId, cart)
    if (!updatedCart) throw new CustomError('Could not update cart.', 500)
    return updatedCart.asDto()
  }
  removeProductFromCart = async (userId, productId) => {
    const cart = await this.#repository.getById(userId)
    cart.removeProduct(productId)
    const updatedCart = await this.#repository.updateById(userId, cart)
    if (!updatedCart) throw new CustomError('Could not update cart.', 500)
    return updatedCart.asDto()
  }
  emptyCart = async (userId) => {
    const cart = await this.#repository.getById(userId)
    cart.removeAllProducts()
    const updatedCart = await this.#repository.updateById(userId, cart)
    if (!updatedCart) throw new CustomError('Could not update cart.', 500)
    return updatedCart.asDto()
  }
}
