import { Router } from 'express'
import { uploadImage } from '../../config/multer.js'
import { ImagesController } from './ImagesController.js'

const imagesController = ImagesController.getController()
const imagesRouter = Router()

imagesRouter.post('/', uploadImage, imagesController.upload)

export class ImagesRouter {
  static getRouter = () => imagesRouter
}
