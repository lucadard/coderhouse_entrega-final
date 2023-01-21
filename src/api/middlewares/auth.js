import passport from 'passport'
import { CustomError } from '../models/CustomError.js'
import { vars } from '../config/vars.js'

const handleJWT = (req, res, next, options) => async (err, user, info) => {
  try {
    if (err || !user)
      throw new CustomError('Unauthorized: You are not logged in.', 401)
    if (options.admin === true && !vars.admins.includes(user.email))
      throw new CustomError(
        'Forbidden: You do not have permission to this route.',
        403
      )
  } catch (err) {
    next(err)
  }
  req.user = user
  return next()
}

export const authorize =
  (options = { admin: false }) =>
  (req, res, next) =>
    passport.authenticate(
      'jwt',
      { session: false },
      handleJWT(req, res, next, options)
    )(req, res, next)
