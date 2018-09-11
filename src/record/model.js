import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  type: String,
  date: Date,
});

export default mongoose.model('Hello', schema);
