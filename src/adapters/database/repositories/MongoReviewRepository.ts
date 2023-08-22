import { IReview, IReviewsByPlatforms } from "../../../domain/models/ReviewModel";
import { ReviewRepository } from "../../../domain/repositories/ReviewRepository";
import ReviewModel from "../schemas/Review";
import { ObjectId } from "mongodb";

export class MongoReviewRepository implements ReviewRepository {

  /**
   * @description Creates a new review in database.
   * @param {string} movieId - ObjectId from movie which review will belong to.
   * @param {string} platformId - ObjectId from platform where review is being posted.
   * @param {Partial<IReview>} reviewData - Object with necessary data to create a review.
   * @returns {Promise<IReview>} Promise with created review data.
   */
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

  /**
   * @description Gets multiple reviews by movie ObjectId.
   * @param {string} movieId - Movie ObjectId.
   * @returns {Promise<Array<IReview>>} Promise with array of reviews that belongs to searched movie.
   */
  async getMovieReviews(movieId: string): Promise<Array<IReview>> {
    const movieReviews = await ReviewModel.find({ movie: movieId });
    
    return movieReviews;
  }

  /**
   * @description Gets multiple reviews by movie ObjectId grouped by platform where reviews were posted.
   * @param {string} movieId - Movie ObjectId.
   * @returns {Promise<Array<IReviewsByPlatforms>>} Reviews grouped by platform.
   */
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