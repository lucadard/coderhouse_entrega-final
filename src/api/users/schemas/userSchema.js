import { Schema } from 'mongoose'

export const UserSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String }
  },
  { timestamps: true }
)
