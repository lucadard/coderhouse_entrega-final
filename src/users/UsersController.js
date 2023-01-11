import { usersService } from './index.js'

const usersController = {
  getUser: async (req, res, next) => {
    try {
      const user = await usersService.getUserById(req.user.id) // req.user is data from jwt
      res.json({
        userData: {
          ...user,
          password: undefined // remove password from response
        }
      })
    } catch (err) {
      next(err)
    }
  },
  registerUser: async (req, res, next) => {
    try {
      const createdUser = await usersService.addUser(req.body)
      res.json({ id: createdUser.id })
    } catch (err) {
      next(err)
    }
  }
}

export class UsersController {
  static getController = () => usersController
}
