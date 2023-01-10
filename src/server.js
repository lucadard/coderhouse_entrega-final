import express from 'express'

import { imagesRouter } from './images/index.js'
import { ordersRouter } from './orders/index.js'
import { shoppingCartsRouter } from './shoppingCarts/index.js'
import { productsRouter } from './products/index.js'
import { usersRouter } from './users/index.js'

import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

/* MIDDLEWARES */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('public'))

/* ROUTES */
app.use('/api/images', imagesRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)
app.use('/api/shoppingcartproducts', shoppingCartsRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler)

export async function createServer(PORT) {
  return new Promise((res, rej) => {
    const server = app.listen(PORT)
    server.on('listening', () => res(server))
    server.on('error', () => rej(err))
  })
}
