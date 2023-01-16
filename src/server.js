import express from 'express'

import { authRouter } from './auth/index.js'
import { imagesRouter } from './images/index.js'
// import { ordersRouter } from './orders/index.js'
import { cartsRouter } from './carts/index.js'
import { productsRouter } from './products/index.js'
import { usersRouter } from './users/index.js'

import { passportMiddleware } from './middlewares/passport.js'
import { errorHandler } from './middlewares/error.js'

const app = express()

/* MIDDLEWARES */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'))
app.use(passportMiddleware)

/* ROUTES */
app.use('/login', authRouter)
app.use('/api/images', imagesRouter)
// app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)
app.use('/api/shoppingcartproducts', cartsRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler)

export async function createServer(PORT) {
  return new Promise((res, rej) => {
    const server = app.listen(PORT)
    server.on('listening', () => res(server))
    server.on('error', () => rej(err))
  })
}
