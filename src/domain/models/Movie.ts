import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  slug: string;
  image: string;
  director: string;
  platforms: Array<Schema.Types.ObjectId>;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  reviews: Array<Schema.Types.ObjectId>;
}

const movieSchema = new mongoose.Schema<IMovie>({
	title: String,
	slug: String,
	image: String,
  director: String,
	platforms: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
	score: Number,
  createdAt: Date,
  updatedAt: Date,
	reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;