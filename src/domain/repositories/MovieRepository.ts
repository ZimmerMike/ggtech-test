import { IMovie } from "../models/MovieModel";
import { IReviewsByPlatforms } from "../models/ReviewModel";

export interface MovieRepository {
  createMovie(movieData: Partial<IMovie>): Promise<IMovie>;
  deleteMovie(movieId: string): Promise<void>;
  findMovieById(movieId: string): Promise<IMovie>;
  getAllMovies(moviesPerPage: number, pageNumber: number): Promise<Array<IMovie>>;
  updateMovieReviewsAndScore(movieId: string, reviewsByPlatform: Array<IReviewsByPlatforms>, score: number): Promise<void>;
}