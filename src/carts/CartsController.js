import { cartsService } from './index.js'

const cartsController = {
  getCart: async (req, res, next) => {
    try {
      const { products } = await cartsService.getCart(req.user.id) // req.user is data from jwt
      res.json({ products })
    } catch (err) {
      next(err)
    }
  },
  addProductToCart: async (req, res, next) => {
    try {
      const { productId } = req.params
      const updatedCart = await cartsService.addProductToCart(
        req.user.id,
        productId
      )
      res.json({ id: updatedCart.id })
    } catch (err) {
      next(err)
    }
  },
  removeFromCart: async (req, res, next) => {
    try {
      const { productId } = req.params
      const updatedCart = await cartsService.removeProductFromCart(
        req.user.id,
        productId
      )
      res.json({ id: updatedCart.id })
    } catch (err) {
      next(err)
    }
  }
}

export class CartsController {
  static getController = () => cartsController
}
