import { usersService } from '../users/index.js'

const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const token = await usersService.login(email, password)
      res.json({ token })
    } catch (err) {
      next(err)
    }
  }
}
export class AuthController {
  static getController = () => authController
}
