import { Schema } from 'mongoose'

export const OrderSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    clientId: { type: String, required: true },
    prods: { _id: false, type: Array, default: [] }
  },
  { timestamps: true }
)
