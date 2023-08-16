// src/controllers/movieController.ts
import { Request, Response } from 'express';
import Movie from '../models/Movie';
import { MovieService } from '../services/movieService';

const movieServie = new MovieService();
// Import other necessary models and services

export const createMovie = async (req: Request, res: Response) => {
  const createdMovie = await movieServie.createMovie(req.body);

	return res.status(200).json({ data: createdMovie, message: 'Movie created succesfully!' });
};

export const getMovieById = async (req: Request, res: Response) => {
  // Implement get movie by ID logic
};

export const cloneMovie = async (req: Request, res: Response) => {
  // Implement clone movie logic
};

export const deleteMovie = async (req: Request, res: Response) => {
  // Implement delete movie logic
};

export const createReview = async (req: Request, res: Response) => {
  // Implement create review logic
};

export const getMovieReviews = async (req: Request, res: Response) => {
  // Implement get movie reviews logic
};