import { IReview, IReviewsByPlatforms } from "../../../domain/models/ReviewModel";
import { ReviewRepository } from "../../../domain/repositories/ReviewRepository";
import ReviewModel from "../schemas/Review";
import { ObjectId } from "mongodb";

export class MongoReviewRepository implements ReviewRepository {

  async createReview(movieId: string, platformId: string, reviewData: Partial<IReview>): Promise<IReview> {
    const review = new ReviewModel({
      ...reviewData,
      movie: movieId,
      platform: platformId,
      createdAt: new Date()
    });
    
    const createdReview = await review.save();

    return createdReview;
  }

  async getMovieReviews(movieId: string): Promise<Array<IReview>> {
    const movieReviews = await ReviewModel.find({ movie: movieId });
    
    return movieReviews;
  }

  async getMovieReviewGroupedByPlatform(movieId: string): Promise<Array<IReviewsByPlatforms>> {
    const reviewsFound = await ReviewModel.aggregate([
      {
        '$match': {
          'movie': new ObjectId(movieId)
        }
      }, {
        '$group': {
          '_id': '$platform', 
          'reviews': {
            '$push': '$$ROOT'
          }
        }
      }
    ]);

    return reviewsFound;
  }
    
}