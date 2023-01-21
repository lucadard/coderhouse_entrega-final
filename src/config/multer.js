import { randomUUID } from 'crypto'
import multer from 'multer'
import path from 'path'
import { vars } from './vars.js'
import { CustomError } from '../api/models/CustomError.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, vars.staticPath.folder + '/images')
  },
  filename: function (req, file, cb) {
    cb(null, randomUUID() + path.extname(file.originalname).toLowerCase())
  }
})

export const uploadImage = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowed.some((t) => ext.includes(t))) cb(null, true)
    else cb(new CustomError('Only images are allowed.', 405))
  },
  limits: {
    fileSize: 8 * 1000 * 1024 // 8MB
  }
}).single('image')
