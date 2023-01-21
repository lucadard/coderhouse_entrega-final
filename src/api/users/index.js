import { Repository } from '../databases/Repository.js'
import { UsersDaoFactory } from './UsersDAOFactory.js'
import { UsersRouter } from './UsersRouter.js'
import { UsersService } from './UsersService.js'
import { User } from './models/User.js'

export const usersRouter = UsersRouter.getRouter()

const usersDao = UsersDaoFactory.getDao()
const usersRepository = new Repository(usersDao, User)
export const usersService = new UsersService(usersRepository)
