import { ordersService } from './index.js'

const ordersController = {
  getOrdersByUserId: async (req, res, next) => {
    try {
      const orders = await ordersService.getOrdersByUserId(req.user.id) // req.user is data from jwt
      res.json({ orders })
    } catch (err) {
      next(err)
    }
  },
  sendOrder: async (req, res, next) => {
    try {
      const createdOrder = await ordersService.createOrder(req.user.id)
      res.json({ id: createdOrder.id })
    } catch (err) {
      next(err)
    }
  }
}

export class OrdersController {
  static getController = () => ordersController
}
