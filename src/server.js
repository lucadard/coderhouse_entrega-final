import express from 'express'

import { authRouter } from './api/auth/index.js'
import { imagesRouter } from './api/images/index.js'
import { ordersRouter } from './api/orders/index.js'
import { cartsRouter } from './api/carts/index.js'
import { productsRouter } from './api/products/index.js'
import { usersRouter } from './api/users/index.js'
import passport from 'passport'
import { strategies } from './config/passport.js'
import { errorHandler } from './api/middlewares/error.js'
import { vars } from './config/vars.js'
import cors from 'cors'
import { reqLogger } from './api/middlewares/logger.js'

const app = express()

/* MIDDLEWARES */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(vars.staticPath.url, express.static(vars.staticPath.folder))
app.use(passport.initialize())
passport.use('jwt', strategies.jwt)
app.use(reqLogger)
app.use(cors())

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
