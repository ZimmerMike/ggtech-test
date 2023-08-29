import { Request, Response } from 'express';
import { ReviewService } from '../../services/review.service';
import { SuccessMessages } from '../../domain/responseMessages';

const reviewServie = new ReviewService();

export class ReviewController {

  public async createReview(req: Request, res: Response) {
    try {
      const createdReview = await reviewServie.createReview(req.params.movieId, req.params.platformId, req.body);
  
      return res.status(200).json({ data: createdReview, message: SuccessMessages.REVIEW_POSTED });
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  }
}