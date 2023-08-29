import { IMovie } from "../../../domain/models/MovieModel";
import { MovieRepository } from "../../../domain/repositories/MovieRepository";
import MovieModel from "../schemas/Movie";
import { IReviewsByPlatforms } from "../../../domain/models/ReviewModel";

export class MongoMovieRepository implements MovieRepository {
  
  /**
   * @description Creates a new movie in database.
   * @param {Partial<IMovie>} movieData - Movie necessary data to create a new movie.
   * @returns {Promise<IMovie>} Promise with created movie information.
   */
  async createMovie(movieData: Partial<IMovie>): Promise<IMovie> {
    const movie = new MovieModel({
      ...movieData,
      createdAt: new Date()
    });

    const createdMovie = await movie.save();

    return createdMovie;
  }
  
  /**
   * @description Deletes a movie from database.
   * @param {string} movieId - ObjectId from movie that will be deleted.
   */
  async deleteMovie(movieId: string): Promise<void> {
    await MovieModel.findByIdAndDelete(movieId);
  }

  /**
   * @description Find one movie by its ObjectiD.
   * @param {string} movieId - ObjectId from movie that will be searched.
   * @returns {Promise<IMovie>} Promise with found movie information.
   */
  async findMovieById(movieId: string): Promise<IMovie> {
    return await MovieModel.findById(movieId);
  }

	/**
	 * @description Gets all movies in database and can receive how many elements want to retrieve and what page of this pagination must be retrieved.
	 * @param {number} moviesPerPage - Movies that must be retrieved per page in the query.
	 * @param {number} pageNumber - Page number with elements that should be retrieved.
	 * @returns {Promise<Array<IMovie>>} All registered movies in collection according with pagination data provided in query params.
	 */
  async getAllMovies(moviesPerPage: number, pageNumber: number): Promise<Array<IMovie>> {
    const skipAmount = (pageNumber - 1) * moviesPerPage;

    return await MovieModel.find({}).limit(moviesPerPage).skip(skipAmount);
  }

  /**
   * @description Updates a movie adding new review and updating new average score.
   * @param {string} movieId - ObjectId from movie that will be updated.
   * @param {Array<IReviewsByPlatforms>} reviewsByPlatform - New movie reviews to be set.
   * @param {number} score - New average score that was calculated after posting a new review.
   */
  async updateMovieReviewsAndScore(movieId: string, reviewsByPlatform: Array<IReviewsByPlatforms>, score: number): Promise<void> {
    await MovieModel.findByIdAndUpdate(movieId, {$set: { reviews: reviewsByPlatform, score: score, updatedAt: new Date() } });
  }

}