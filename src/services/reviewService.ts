import { Exception } from "../domain/exception";
import { ReviewCreationBody } from "../interfaces/review.interface";
import Review from "../models/Review";

export class ReviewService {

	public async createReview(reviewData: ReviewCreationBody, movieId: string, platformId: string) {
    try {
      reviewData.movie = movieId;
      reviewData.platform = platformId;
      reviewData.createdAt = new Date();
      reviewData.updatedAt = new Date();
		  const reviewCreated = await Review.create(reviewData);

      return reviewCreated;
    } catch (error) {
			throw new Exception('ERROR_POSTING_REVIEW', 'Ocurrió un error al publicar la reseña.');
    }
  }

  public async getReviewsByMovie(movieId: string) {
    try {
      const reviewsFound = await Review.aggregate([
        {
          $match: {
            movie: movieId
          }
        }/*,
        {
          $lookup: {
            from: 'platforms',
            localField: 'platform',
            foreignField: '_id',
            as: 'platform',
          },
        },
        {
          $group: {
            _id: '$platform',
            reviews: { $push: '$$ROOT' }
          }
        },
        {
          $project: {
            platform: { $arrayElemAt: ['$reviews.platform', 0] },
            reviews: 1,
          }
        }*/
      ]);

      return reviewsFound;
    } catch (error) {
      console.log(error)
      throw new Exception('ERROR_GETTING_MOVIE_REVIEWS', 'Ocurrió un error al obtener las reseñas de la pelicula.');
    }
  }
}