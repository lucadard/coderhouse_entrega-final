import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { config } from '../config/index.js'
import { usersService } from '../users/index.js'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, async function (payload, done) {
  const user = await usersService.getUserById(payload.id)
  return done(null, { id: user.id })
})

passport.use(JwtStrategy)

export const passportMiddleware = passport.initialize()

export const isLogged = passport.authenticate('jwt', { session: false })
