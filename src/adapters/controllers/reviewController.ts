import { Request, Response } from 'express';
import { ReviewService } from '../../services/review.service';

const reviewServie = new ReviewService();

export class ReviewController {

  public async createReview(req: Request, res: Response) {
    try {
      const createdReview = await reviewServie.createReview(req.params.movieId, req.params.platformId, req.body);
  
      return res.status(200).json({ data: createdReview, message: 'Review posted successfully!' });
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  }
  
  public async getMovieReviews(req: Request, res: Response) {
    try {
      const foundReviews = await reviewServie.getReviewsByMovie(req.params.movieId);
  
      return res.status(200).json({ data: foundReviews, message: 'Reviews found for this movie' });
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  }
}