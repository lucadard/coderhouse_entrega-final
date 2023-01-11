import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { usersService } from '../users/index.js'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

const JwtStrategy = new Strategy(options, async function (payload, done) {
  const user = await usersService.getUserById(payload.id)
  return done(null, { id: user.id })
})

passport.use(JwtStrategy)

export const passportMiddleware = passport.initialize()

export const authenticateUser = passport.authenticate('jwt', { session: false })
