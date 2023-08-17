import { Request, Response } from 'express';
import { ReviewService } from '../services/reviewService';

const reviewServie = new ReviewService();

export const createReview = async (req: Request, res: Response) => {
  try {
    const createdReview = await reviewServie.createReview(req.body, req.params.movieId, req.params.platformId);

    return res.status(200).json({ data: createdReview, message: 'Review posted successfully!' })
  } catch (error) {
		return res.status(400).send(error);
  }
};

export const getMovieReviews = async (req: Request, res: Response) => {
  try {
    const foundReviews = await reviewServie.getReviewsByMovie(req.params.movieId);

    return res.status(200).json({ data: foundReviews, message: 'Reviews found for this movie' })
  } catch (error) {
		return res.status(400).send(error);
  }
};