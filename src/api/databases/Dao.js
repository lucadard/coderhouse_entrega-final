import mongoose from 'mongoose'
import { vars } from '../config/vars.js'

export default class Dao {
  #collection
  #collectionName
  constructor(collectionName, schema, cnxStr) {
    this.#collection = mongoose.model(collectionName, schema)
    this.#collectionName = collectionName
    this.connect()
  }

  connect() {
    mongoose.connect(vars.mongoUrl)
    mongoose.connection.on('connected', () =>
      console.log(`MongoDB: Connected to ${this.#collectionName} collection.`)
    )
    mongoose.connection.on('error', () =>
      console.log(
        `MongoDB: Couldn't connect to ${this.#collectionName} collection.`
      )
    )
  }
  async getById(id) {
    const document = await this.#collection
      .findOne({ id })
      .select({ _id: 0, __v: 0 })
      .lean()
    return document
  }
  async getByQuery(query) {
    const documents = await this.#collection
      .find(query)
      .select({ _id: 0, __v: 0 })
      .lean()
    return documents
  }
  async getAll() {
    const documents = await this.#collection
      .find({})
      .select({ _id: 0, __v: 0 })
      .lean()
    return documents
  }
  async insert(item) {
    const newItem = new this.#collection(item)
    await newItem.save()
    return newItem
  }
  async updateById(id, data) {
    const updatedItem = await this.#collection
      .findOneAndUpdate({ id }, { $set: { ...data } }, { new: true })
      .select({ _id: 0, __v: 0 })
      .lean()
    return updatedItem
  }
  async deleteById(id) {
    const deletedItem = await this.#collection
      .findOneAndRemove({ id })
      .select({ _id: 0, __v: 0 })
      .lean()
    return deletedItem
  }
  async count() {
    return await this.#collection.count({})
  }
}
