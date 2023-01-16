import { randomUUID } from 'crypto'
import multer from 'multer'
import path from 'path'
import { CustomError } from '../../models/CustomError.js'

const imagesPath =
  process.env.NODE_ENV === 'production'
    ? process.env.STATIC_PATH
    : 'public/images'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath)
  },
  filename: function (req, file, cb) {
    cb(null, randomUUID() + path.extname(file.originalname).toLowerCase())
  }
})

export const uploadImage = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowed = ['.jpg', '.jpeg', '.png']
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowed.some((t) => ext.includes(t))) cb(null, true)
    else cb(new CustomError('Only images are allowed.', 405))
  },
  limits: {
    fileSize: 8 * 1000 * 1024 // 8MB
  }
}).single('image')
