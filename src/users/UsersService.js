import { randomUUID } from 'crypto'
import { User } from './models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const isPasswordValid = (user, password) =>
  bcrypt.compareSync(password, user.password)
const generateAccessToken = (user) => jwt.sign(user, process.env.JWT_SECRET)

export class UsersService {
  #repository
  constructor(repository) {
    this.#repository = repository
  }
  getUserById = async (userId) => {
    const user = await this.#repository.getById(userId)
    return user ? user.asDto() : undefined
  }
  addUser = async (userData) => {
    const newUser = new User({
      ...userData,
      id: randomUUID(),
      password: createHash(userData.password)
    })
    const createdUser = await this.#repository.create(newUser)
    return createdUser ? createdUser.asDto() : undefined
  }
  login = async (email, password) => {
    const [user] = await this.#repository.getByQuery({ email })
    if (!isPasswordValid(user.asDto(), password))
      throw new Error('Invalid credentials')

    return generateAccessToken({ id: user.asDto().id })
  }
}
