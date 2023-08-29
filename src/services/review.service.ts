import { Exception } from "../domain/exception";
import { IReview, IReviewsByPlatforms } from "../domain/models/ReviewModel";
import { MongoReviewRepository } from "../adapters/database/repositories/MongoReviewRepository";
import { MongoMovieRepository } from "../adapters/database/repositories/MongoMovieRepository";
import { ErrorMessages } from "../domain/responseMessages";

const movieRepository = new MongoMovieRepository();
const reviewRepository = new MongoReviewRepository();

export class ReviewService {

  /**
   * @description Creates a new review in database and updates the movie with new average score and adding the new review.
   * @param {string} movieId - ObjectId from movie which review must belong to.
   * @param {string} platformId - ObjectId from platform where review is being posted.
   * @param {Partial<IReview>} reviewData - Review data that will be registered in database.
   * @returns {Promise<IReview>} Promise with created review full data.
   */
	public async createReview(movieId: string, platformId: string, reviewData: Partial<IReview>): Promise<IReview> {
    try {
      const reviewCreated = await reviewRepository.createReview(movieId, platformId, reviewData);
      const movieReviewsByPlatform = await reviewRepository.getMovieReviewGroupedByPlatform(movieId);
      const allReviews = this.extractAllReviews(movieReviewsByPlatform);
      const averageScore = this.calculateMovieScore(allReviews);
      await movieRepository.updateMovieReviewsAndScore(movieId, movieReviewsByPlatform, averageScore);

      return reviewCreated;
    } catch (error) {
			throw new Exception(ErrorMessages.ERROR_CREATING_REVIEW, `An error ocurred while posting the review. ${error} - ${error.description}`);
    }
  }

  /**
   * @description Gets all reviews from array with reviews by platform in movie data.
   * @param {Array<IReviewsByPlatforms>} reviewsByPlatform - Array with different reviews grouped by platform.
   * @returns {Array<IReview>} Array with all movie reviews.
   */
  private extractAllReviews(reviewsByPlatform: Array<IReviewsByPlatforms>): Array<IReview> {
    const allReviews: Array<IReview> = [];
    for (const reviewByPlatform of reviewsByPlatform) {
      allReviews.push(...reviewByPlatform.reviews)
    }

    return allReviews;
  }

  /**
   * @description Calculates the movie's total average score from all movie reviews.
   * @param {Array<IReview>} reviews - Array with all movie reviews.
   * @returns {number} Movie's total average score.
   */
	private calculateMovieScore(reviews: Array<IReview>): number {
    const scoreSum = reviews.reduce((total, review) => total + review.score, 0);

    return scoreSum / reviews.length;
	}
}