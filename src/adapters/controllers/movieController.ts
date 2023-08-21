import { Request, Response } from 'express';
import { MovieService } from '../../services/movie.service';

const movieService = new MovieService();
// Import other necessary models and services

export class MovieController {
  public async createMovie(req: Request, res: Response) {
    try {
      const createdMovie = await movieService.createMovie(req.body);
    
      return res.status(200).json({ data: createdMovie, message: 'Movie created successfully!' });
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  }
  
  public async getMovieById(req: Request, res: Response) {
    try {
      const foundMovie = await movieService.getMovieById(req.params.movieId);

      return res.status(200).json({ data: foundMovie, message: 'Movie found' })
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  }
  
  public async cloneMovie(req: Request, res: Response) {
    try {
      const clonedMovie = await movieService.cloneMovie(req.params.movieId);

      return res.status(200).json({ data: clonedMovie, message: 'Movie cloned successfully' });
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  };
  
  public async deleteMovie(req: Request, res: Response) {
    try {
      await movieService.deleteMovie(req.params.movieId);
  
      return res.status(200).json({ message: 'Movie was deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  };
}