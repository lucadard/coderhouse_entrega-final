const imagesController = {
  upload: (req, res) => {
    res.send({ success: true, imageUrl: req.file.path })
  }
}

export class ImagesController {
  static getController = () => imagesController
}
