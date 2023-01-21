import { validateData } from '../../validation/joi.js'
import { orderSchema } from '../schemas/joiSchema.js'

export class Order {
  #id
  #clientId
  #prods
  #createdAt
  constructor(order) {
    const data = validateData(orderSchema, order, 'Invalid order data.')
    this.#id = data.id
    this.#clientId = data.clientId
    this.#prods = data.prods
    this.#createdAt = data.createdAt
  }
  asDto = () =>
    Object.freeze({
      id: this.#id,
      clientId: this.#clientId,
      prods: this.#prods,
      createdAt: this.#createdAt
    })
}
