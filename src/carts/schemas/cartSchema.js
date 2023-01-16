import { Schema } from 'mongoose'

export const CartSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    products: { _id: false, type: Array, default: [] }
  },
  { timestamps: true }
)
