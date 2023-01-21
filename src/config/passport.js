import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { vars } from './vars.js'
import { usersService } from '../api/users/index.js'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: vars.jwtSecret
}

const jwt = async (payload, done) => {
  try {
    const user = await usersService.getUserById(payload.id)
    if (user) return done(null, { id: user.id })
    else return done(null, false)
  } catch (err) {
    return done(err, false)
  }
}

export const strategies = {
  jwt: new JwtStrategy(jwtOptions, jwt)
}
