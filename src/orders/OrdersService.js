import { cartsService } from '../carts/index.js'
import { CustomError } from '../models/CustomError.js'
import { Order } from './models/Order.js'
import {
  sendEmail,
  generateAdminEmail,
  generateUserEmail
} from '../config/nodemailer.js'
import { usersService } from '../users/index.js'

const addCostToProducts = (products) => {
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
        id: undefined,
        clientId,
        prods: addCostToProducts(cartData.products)
      })
    )
    if (!createdOrder) throw new CustomError('Could not create order', 500)
    const updatedCart = await cartsService.emptyCart(clientId)

    const userData = await usersService.getUserById(clientId)

    try {
      // Send email to admin
      await sendEmail(
        'admin',
        'Nueva orden ✔',
        generateAdminEmail(userData, createdOrder.asDto())
      )
      // Send email to user
      await sendEmail(
        userData.email,
        'Nos llegó tu orden ✔',
        generateUserEmail(createdOrder.asDto())
      )
    } catch (err) {
      throw err
    }

    return createdOrder.asDto()
  }
}
