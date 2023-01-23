import { vars } from '../../../config/vars.js'
import { validateData } from '../../validation/joi.js'
import { productSchema, updateSchema } from '../schemas/joiSchema.js'

export class Product {
  #id
  #name
  #description
  #price
  #image
  constructor(product) {
    if (!product.image) product.image = vars.staticPath.defaultProductPicture
    const data = validateData(productSchema, product, 'Invalid product data.')
    this.#id = data.id
    this.#name = data.name
    this.#description = data.description
    this.#price = data.price
    this.#image = data.image
  }
  update(newData) {
    const data = validateData(updateSchema, newData, 'Invalid product data.')
    this.#name = data.name ?? this.#name
    this.#description = data.description ?? this.#description
    this.#price = data.price ?? this.#price
    this.#image = data.image ?? this.#image
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
