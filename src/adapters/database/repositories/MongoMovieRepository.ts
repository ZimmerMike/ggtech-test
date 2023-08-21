import mongoose from "mongoose";
import { Exception } from "../../../domain/exception";
import { IMovie } from "../../../domain/models/MovieModel";
import { MovieRepository } from "../../../domain/repositories/MovieRepository";
import MovieModel from "../schemas/Movie";

export class MongoMovieRepository implements MovieRepository {
  async createMovie(movieData: Partial<IMovie>): Promise<IMovie> {
    const movie = new MovieModel({
      ...movieData,
      createdAt: new Date()
    });

    const createdMovie = await movie.save();

    return createdMovie;
  }
  
  async deleteMovie(movieId: string): Promise<void> {
    await MovieModel.findByIdAndDelete(movieId);
  }

  async findMovieById(movieId: string): Promise<IMovie> {
    return await MovieModel.findById(movieId);
  }

  async updateMovieReviewsAndScore(movieId: string, reviewId: string, score: number): Promise<void> {
    return await MovieModel.findByIdAndUpdate(movieId, { $push: { reviews: reviewId }, $set: { score: score, updatedAt: new Date() } });
  }

}