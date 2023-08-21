import mongoose from 'mongoose';
import { IReview } from '../../../domain/models/ReviewModel';

const reviewSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  platform: { type: mongoose.Schema.Types.ObjectId, ref: 'Platform' },
  author: String,
  body: String,
  score: Number,
  createdAt: Date,
  updatedAt: Date,
});

const ReviewModel = mongoose.model<IReview>('Review', reviewSchema);

export default ReviewModel;