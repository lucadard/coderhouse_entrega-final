import { CustomError } from '../../models/CustomError.js'

export class Order {
  #id
  #clientId
  #prods
  #createdAt
  constructor(order) {
    // DO DATA VALIDATION HERE!
    if (!order) throw new CustomError('Invalid order data', 400)
    this.#id = order.id
    this.#clientId = order.clientId
    this.#prods = order.prods
    this.#createdAt = order.createdAt
  }
  asDto = () =>
    Object.freeze({
      id: this.#id,
      clientId: this.#clientId,
      prods: this.#prods,
      createdAt: this.#createdAt
    })
}
