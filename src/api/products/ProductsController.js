import { productsService } from './index.js'

const productsController = {
  getProducts: async (req, res, next) => {
    try {
      const products = await productsService.getAllProducts()
      res.json({ products })
    } catch (err) {
      next(err)
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const { productId } = req.params
      const product = await productsService.getProductById(productId)
      res.json({ product })
    } catch (err) {
      next(err)
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const newProductData = req.body
      const createdProduct = await productsService.createProduct(newProductData)
      res.json({ id: createdProduct.id })
    } catch (err) {
      next(err)
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const productData = req.body
      const { productId } = req.params
      const updateProduct = await productsService.updateProduct(
        productId,
        productData
      )
      res.json({ id: updateProduct.id })
    } catch (err) {
      next(err)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { productId } = req.params
      const deletedProduct = await productsService.deleteProduct(productId)
      res.json({ id: deletedProduct.id })
    } catch (err) {
      next(err)
    }
  }
}

export class ProductsController {
  static getController = () => productsController
}
