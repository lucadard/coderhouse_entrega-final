import { Schema } from 'mongoose'

export const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    image: { type: String, required: true }
  },
  { timestamps: true }
)
