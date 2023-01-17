import { randomUUID } from 'crypto'
import { cartsService } from '../carts/index.js'
import { CustomError } from '../models/CustomError.js'
import { Order } from './models/Order.js'
import { generateEmailText, sendOrderEmail } from '../config/nodemailer.js'
import { usersService } from '../users/index.js'

const addCostToProducts = (products) => {
  console.log(products)
  let productsWithCost = []
  for (let product of products) {
    const cost = product.cant * product.prod.price
    productsWithCost.push({ ...product, cost })
  }
  return productsWithCost
}
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
    const cartData = await cartsService.getCart(clientId)
    if (cartData.products.length < 1)
      throw new CustomError('Cart is empty, could not create order.', 400)
    const createdOrder = await this.#repository.create(
      new Order({
        id: randomUUID(),
        clientId,
        prods: addCostToProducts(cartData.products)
      })
    )
    if (!createdOrder) throw new CustomError('Could not create order', 500)
    const updatedCart = await cartsService.emptyCart(clientId)

    const userData = await usersService.getUserById(clientId)

    try {
      const info = await sendOrderEmail(
        generateEmailText(userData, createdOrder.asDto())
      )
      console.log('Email sent', info.messageId)
    } catch (err) {
      throw err
    }

    return createdOrder.asDto()
  }
}
