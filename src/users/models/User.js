import { CustomError } from '../../models/CustomError.js'
export class User {
  #id
  #email
  #password
  #name
  #lastname
  #image
  #role
  constructor(user) {
    // DO DATA VALIDATION HERE!
    if (!user) throw CustomError('Invalid product data', 400)
    this.#id = user.id
    this.#email = user.email
    this.#password = user.password
    this.#name = user.name
    this.#lastname = user.lastname
    this.#image = user.image
    this.#role = user.role
  }
  asDto = () =>
    Object.freeze({
      id: this.#id,
      email: this.#email,
      password: this.#password,
      name: this.#name,
      lastname: this.#lastname,
      image: this.#image,
      role: this.#role
    })
}
