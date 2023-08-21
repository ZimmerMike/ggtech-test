import mongoose, { Schema } from 'mongoose';
import { IMovie } from '../../../domain/models/MovieModel';

const movieSchema = new mongoose.Schema({
	title: String,
	slug: String,
	image: String,
  director: String,
	platforms: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
	score: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: Date,
	reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

const MovieModel = mongoose.model<IMovie>('Movie', movieSchema);

export default MovieModel;