export class User {
  #id
  #email
  #password
  #name
  #lastname
  #image
  constructor(user) {
    // DO DATA VALIDATION HERE!
    this.#id = user.id
    this.#email = user.email
    this.#password = user.password
    this.#name = user.name
    this.#lastname = user.lastname
    this.#image = user.image
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
