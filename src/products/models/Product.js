import { CustomError } from '../../models/CustomError.js'

export class Product {
  #id
  #name
  #description
  #price
  #image
  constructor(product) {
    // DO DATA VALIDATION HERE!
    if (!product) throw new CustomError('Invalid product data', 400)
    this.#id = product.id
    this.#name = product.name
    this.#description = product.description
    this.#price = product.price
    this.#image = product.image
  }
  asDto = () =>
    Object.freeze({
      id: this.#id,
      name: this.#name,
      description: this.#description,
      price: this.#price,
      image: this.#image
    })
}
