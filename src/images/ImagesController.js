import { config } from '../config/index.js'

const imagesController = {
  upload: (req, res) => {
    res.send({
      success: true,
      imageUrl: req.file.path.replace(
        config.staticPath.folder,
        config.staticPath.url
      )
    })
  }
}

export class ImagesController {
  static getController = () => imagesController
}
