export class CustomError extends Error {
  #message
  #status
  #details
  constructor(message, status, details = { type: 'Server Error' }) {
    super(message)
    this.#status = status
    this.#details = details
  }
  get message() {
    return this.#message
  }
  get status() {
    return this.#status
  }
  get details() {
    return this.#details
  }
}
