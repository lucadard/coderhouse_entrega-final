import { randomUUID } from 'crypto'
import { cartsService } from '../carts/index.js'
import { CustomError } from '../models/CustomError.js'
import { Order } from './models/Order.js'

export class OrdersService {
  #repository
  constructor(repository) {
    this.#repository = repository
  }
  getOrdersByUserId = async (clientId) => {
    const orders = await this.#repository.getByQuery({ clientId })
    return orders.map((order) => order.asDto())
  }
  createOrder = async (clientId) => {
    const { products: cartProducts } = await cartsService.getCart(clientId)
    if (cartProducts.length < 1)
      throw new CustomError('Cart is empty, could not create order.', 400)
    const createdOrder = await this.#repository.create(
      new Order({ id: randomUUID(), clientId, prods: cartProducts })
    )
    if (!createdOrder) throw new CustomError('Could not create order', 500)
    const updatedCart = await cartsService.emptyCart(clientId)
    // HERE SEND AN EMAIL TO ADMINS
    return createdOrder.asDto()
  }
}
