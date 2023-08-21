import ReviewModel from "../adapters/database/schemas/Review";
import { Exception } from "../domain/exception";
import { IReview, IReviewsByPlatforms } from "../domain/models/ReviewModel";
import { MongoReviewRepository } from "../adapters/database/repositories/MongoReviewRepository";
import { MongoMovieRepository } from "../adapters/database/repositories/MongoMovieRepository";

const movieRepository = new MongoMovieRepository();
const reviewRepository = new MongoReviewRepository();

export class ReviewService {

	public async createReview(movieId: string, platformId: string, reviewData: Partial<IReview>): Promise<IReview> {
    try {
      const reviewCreated = await reviewRepository.createReview(movieId, platformId, reviewData);
      const movieReviews = await reviewRepository.getMovieReviews(movieId);
      const averageScore = this.calculateMovieScore(movieReviews);
      await movieRepository.updateMovieReviewsAndScore(movieId, reviewCreated._id, averageScore);

      return reviewCreated;
    } catch (error) {
			throw new Exception('ERROR_CREATING_REVIEW', `Ocurrió un error al publicar la reseña. ${error}`);
    }
  }

	public calculateMovieScore(reviews: Array<IReview>): number {
    const scoreSum = reviews.reduce((total, review) => total + review.score, 0);

    return scoreSum / reviews.length;
	}

  public async getReviewsByMovie(movieId: string): Promise<Array<IReviewsByPlatforms>> {
    try {
      const reviewsByPlatform = await reviewRepository.getMovieReviewGroupedByPlatform(movieId);

      return reviewsByPlatform;
    } catch (error) {
      throw new Exception('ERROR_RETRIEVING_MOVIE_REVIEWS', 'Ocurrió un error al obtener las reseñas de la pelicula.');
    }
  }
}