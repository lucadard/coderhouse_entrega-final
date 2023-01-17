import nodemailer from 'nodemailer'
import { config } from './index.js'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: config.emailSender.user,
    pass: config.emailSender.pass
  }
})

export const sendOrderEmail = (text, html = '') =>
  transporter.sendMail({
    from: '"Coder App 💻" <app@coder.com>', // sender address
    to: config.admins.reduce((acc, cur) => (acc ? acc + ',' + cur : cur), ''), // list of receivers
    subject: 'Nueva orden ✔', // Subject line
    text,
    html
  })

export const generateEmailText = (userData, orderData) => {
  return `Recibiste una orden:\nId de la orden: ${orderData.id}\nUsuario: ${
    userData.email
  }\nFecha: ${new Date(
    orderData.createdAt
  ).toLocaleString()}\nProductos:\n${orderData.prods.reduce(
    (acc, cur, i) =>
      `${acc ? acc + '\n' : acc}-------------------------\n#${i + 1}\nId: ${
        cur.prod.id
      }\nNombre: ${cur.prod.name}\nCantidad: ${cur.cant}\nPrecio por unidad: $${
        cur.prod.price
      }\nPrecio total: $${cur.cost}`,
    ``
  )}`
}
