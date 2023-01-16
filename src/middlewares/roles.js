import { usersService } from '../users/index.js'
import { config } from '../config/index.js'
import { CustomError } from '../models/CustomError.js'

export const hasAdminRole = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.user.id)
    if (config.admins.includes(user.email)) next()
    else throw new CustomError('User does not have permission.', 403)
  } catch (err) {
    next(err)
  }
}
