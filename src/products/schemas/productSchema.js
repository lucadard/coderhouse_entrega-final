import { Schema } from 'mongoose'

export const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
  },
  { timestamps: true }
)
