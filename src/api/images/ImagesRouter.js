import { Router } from 'express'
import { reqLogger } from '../middlewares/logger.js'
import { uploadImage } from '../../config/multer.js'
import { ImagesController } from './ImagesController.js'

const imagesController = ImagesController.getController()
const imagesRouter = Router()

imagesRouter.use(reqLogger)
imagesRouter.post('/', uploadImage, imagesController.upload)

export class ImagesRouter {
  static getRouter = () => imagesRouter
}
