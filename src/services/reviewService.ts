import { Exception } from "../domain/exception";
import { ReviewCreationBody } from "../interfaces/review.interface";
import Review, { IReview } from "../domain/models/Review";

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

  public async getScoresByMultipleReviewIds(reviewsIds: Array<string>) {
    try {
      const scoresFound = await Review.find({ _id: { $in: reviewsIds } }, { score: 1 });

      return scoresFound;
    } catch (error) {
      throw new Exception('ERROR_RETRIEVING_REVIEWS', 'Ocurrió un error al obtener la información de las reseñas.');
    }
  }

	public async calculateMovieScore(reviewsIds: Array<string>): Promise<number> {
		const scores: Array<IReview> = await this.getScoresByMultipleReviewIds(reviewsIds);
    let result = 0;
    for (const score of scores) {
      result += score.score;
    }

    return result / scores.length;
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