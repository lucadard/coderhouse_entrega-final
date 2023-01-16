import { CustomError } from '../../models/CustomError.js'

export class Cart {
  #id
  #products
  constructor(cart) {
    // DO DATA VALIDATION HERE!
    if (!cart) throw new CustomError('Invalid cart data', 400)
    this.#id = cart.id
    this.#products = cart.products
  }
  findInCart = (productId) => {
    const productIndex = this.#products.findIndex(
      (p) => p.prod.id === productId
    )
    return productIndex
  }
  addProduct = (productData) => {
    const productIndex = this.findInCart(productData.id)
    if (productIndex === -1) this.#products.push({ prod: productData, cant: 1 })
    else this.#products[productIndex].cant += 1
  }
  removeProduct = (productId) => {
    const productIndex = this.findInCart(productId)
    if (productIndex === -1)
      throw new CustomError('Product is not in cart.', 404)
    let productQuantity = this.#products[productIndex].cant - 1
    if (productQuantity < 1) this.#products.splice(productIndex, 1)
    else this.#products[productIndex].cant = productQuantity
  }
  removeAllProducts = () => {
    this.#products = []
  }
  asDto = () =>
    Object.freeze({
      id: this.#id,
      products: this.#products
    })
}
