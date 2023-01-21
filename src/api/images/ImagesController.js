import { vars } from '../../config/vars.js'

const imagesController = {
  upload: (req, res) => {
    res.send({
      success: true,
      imageUrl: req.file.path.replace(
        vars.staticPath.folder,
        vars.staticPath.url
      )
    })
  }
}

export class ImagesController {
  static getController = () => imagesController
}
