import { Request, Response } from 'express';
import { MovieService } from '../services/movieService';

const movieServie = new MovieService();
// Import other necessary models and services

export const createMovie = async (req: Request, res: Response) => {
	try {
		const createdMovie = await movieServie.createMovie(req.body);
	
		return res.status(200).json({ data: createdMovie, message: 'Movie created succesfully!' });
	} catch (error) {
		return res.status(400).send(error);
	}
};

export const getMovieById = async (req: Request, res: Response) => {
	try {
		const foundMovie = await movieServie.getMovieById(req.params.movieId);

		return res.status(200).json({ data: foundMovie, message: 'Movie found' })
	} catch (error) {
		return res.status(400).send(error);
	}
};

export const cloneMovie = async (req: Request, res: Response) => {
  // Implement clone movie logic
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
		await movieServie.deleteMovie(req.params.movieId);

		return res.status(200).json({ message: 'Movie was deleted successfully!' })
	} catch (error) {
		return res.status(400).send(error);
	}
};