import { validateData } from '../../validation/joi.js'
import { CustomError } from '../../models/CustomError.js'
import { cartsSchema } from '../schemas/joiSchema.js'

export class Cart {
  #id
  #products
  constructor(cart) {
    const data = validateData(cartsSchema, cart, 'Invalid cart data.')
    this.#id = data.id
    this.#products = data.products
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
    if (productQuantity < 1) this.removeKind(null, productIndex)
    else this.#products[productIndex].cant = productQuantity
  }
  removeKind = (productId = undefined, index) => {
    const productIndex = !productId ? index : this.findInCart(productId)
    if (productIndex === -1)
      throw new CustomError('Product is not in cart.', 404)
    this.#products.splice(productIndex, 1)
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
