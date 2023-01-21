export class Repository {
  #dao
  #Model
  constructor(dao, Model) {
    this.#dao = dao
    this.#Model = Model
  }
  getById = async (id) => {
    const item = await this.#dao.getById(id)
    return item ? new this.#Model(item) : undefined
  }
  getByQuery = async (query) => {
    const results = await this.#dao.getByQuery(query)
    return results.map((result) => new this.#Model(result))
  }
  getAll = async () => {
    const items = await this.#dao.getAll()
    return items.map((result) => new this.#Model(result))
  }
  create = async (newItem) => {
    const createdItem = await this.#dao.insert(newItem.asDto())
    return createdItem ? new this.#Model(createdItem) : undefined
  }
  updateById = async (id, newData) => {
    const updatedItem = await this.#dao.updateById(id, newData.asDto())
    return updatedItem ? new this.#Model(updatedItem) : undefined
  }
  deleteById = async (id) => {
    const deletedItem = await this.#dao.deleteById(id)
    return deletedItem ? new this.#Model(deletedItem) : undefined
  }
}
