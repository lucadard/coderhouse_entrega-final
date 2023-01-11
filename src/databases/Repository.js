export class Repository {
  #dao
  #Model
  constructor(dao, Model) {
    this.#dao = dao
    this.#Model = Model
  }
  getById = async (id) => {
    const item = await this.#dao.getById(id)
    return new this.#Model(item)
  }
  getByQuery = async (query) => {
    const results = await this.#dao.getByQuery(query)
    return results.map((result) => new this.#Model(result))
  }
  create = async (newItem) => {
    const createdItem = await this.#dao.insert(newItem.asDto())
    return new this.#Model(createdItem)
  }
}
