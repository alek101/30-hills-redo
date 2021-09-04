import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  firstName: { type: String },
  surname: { type: String },
  age: { type: Number },
  gender: { type: String },
  friends: [{ type: Number }],
});

export interface Person extends mongoose.Document {
  id: number;
  firstName: string;
  surname: string;
  age: number;
  gender: string;
  friends: number[];
}
