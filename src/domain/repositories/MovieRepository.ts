import { IMovie } from "../models/MovieModel";

export interface MovieRepository {
  createMovie(movieData: Partial<IMovie>): Promise<IMovie>;
  deleteMovie(movieId: string): Promise<void>;
  findMovieById(movieId: string): Promise<IMovie>;
  updateMovieReviewsAndScore(movieId: string, reviewId: string, score: number): Promise<void>;
}