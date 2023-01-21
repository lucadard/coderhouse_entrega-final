import { validateData } from '../../validation/joi.js'
import { userSchema } from '../schemas/joiSchema.js'
export class User {
  #id
  #email
  #password
  #name
  #lastname
  #image
  constructor(user) {
    const data = validateData(userSchema, user, 'Invalid user data.')
    this.#id = data.id
    this.#email = data.email
    this.#password = data.password
    this.#name = data.name
    this.#lastname = data.lastname
    this.#image = data.image
  }
  asDto = () =>
    Object.freeze({
      id: this.#id,
      email: this.#email,
      password: this.#password,
      name: this.#name,
      lastname: this.#lastname,
      image: this.#image
    })
}
