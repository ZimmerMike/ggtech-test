import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  movie: Schema.Types.ObjectId;
  platform: Schema.Types.ObjectId;
  author: string;
  body: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema<IReview>({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  platform: { type: mongoose.Schema.Types.ObjectId, ref: 'Platform' },
  author: String,
  body: String,
  score: Number,
  createdAt: Date,
  updatedAt: Date,
});

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;