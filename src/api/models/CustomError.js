export class CustomError extends Error {
  #message
  #status
  #details
  constructor(message, status, details) {
    super(message)
    this.#status = status
    this.#details = { type: 'Server Error', ...details }
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
