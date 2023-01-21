import mongoose, { Schema } from 'mongoose'
import AutoIncrementFactory from 'mongoose-sequence'
const AutoIncrement = AutoIncrementFactory(mongoose)

export const OrderSchema = new Schema(
  {
    // id: { type: Number, required: true, unique: true },
    clientId: { type: String, required: true },
    prods: { _id: false, type: Array, default: [] }
  },
  { timestamps: true }
)

OrderSchema.plugin(AutoIncrement, { inc_field: 'id' })
