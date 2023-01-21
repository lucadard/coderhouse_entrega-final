import Dao from '../databases/Dao.js'
import { UserSchema } from './schemas/userSchema.js'

const usersDao = new Dao('users', UserSchema)

export class UsersDaoFactory {
  static getDao = () => usersDao
}
