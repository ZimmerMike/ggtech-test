import mongoose, { Document } from 'mongoose';

export interface IPlatform extends Document {
  icon: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const movieSchema = new mongoose.Schema<IPlatform>({
	icon: String,
	title: String,
  createdAt: Date,
  updatedAt: Date,
});

const Platform = mongoose.model('Platform', movieSchema);

export default Platform;