import express from 'express'
import passport from 'passport'
import cors from 'cors'

import { authRouter } from './api/auth/index.js'
import { imagesRouter } from './api/images/index.js'
import { ordersRouter } from './api/orders/index.js'
import { cartsRouter } from './api/carts/index.js'
import { productsRouter } from './api/products/index.js'
import { usersRouter } from './api/users/index.js'

import { vars } from './config/vars.js'
import { reqLogger } from './api/middlewares/logger.js'
import { errorHandler } from './api/middlewares/error.js'
import { strategies } from './config/passport.js'

const app = express()

/* MIDDLEWARES */
app.use(cors())
app.use(reqLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(vars.staticPath.url, express.static(vars.staticPath.folder))
app.use(passport.initialize())
passport.use('jwt', strategies.jwt)

/* ROUTES */
app.use('/login', authRouter)
app.use('/api/images', imagesRouter)
app.use('/api/orders', ordersRouter)
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
