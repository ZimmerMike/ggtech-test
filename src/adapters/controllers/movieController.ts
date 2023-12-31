import { Request, Response } from 'express';

import { MovieService } from '../../services/movie.service';
import { SuccessMessages } from '../../domain/responseMessages';
import { ApiConstants } from '../../domain/constants/api-constants';

const movieService = new MovieService();

export class MovieController {
  public async createMovie(req: Request, res: Response) {
    try {
      const createdMovie = await movieService.createMovie(req.body);
    
      return res.status(200).json({ data: createdMovie, message: SuccessMessages.MOVIE_CREATED });
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  }

  public async getAllMovies(req: Request, res: Response) {
    try {
      const moviesPerPage = parseInt(req.query.itemsPerPage?.toString()) || ApiConstants.DEFAULT_MOVIE_PER_PAGE;
      const pageNumber = parseInt(req.query.pageNumber?.toString()) || ApiConstants.DEFAULT_PAGE_NUMBER;
      const foundMovies = await movieService.getAllMovies(moviesPerPage, pageNumber);

      return res.status(200).json({ data: foundMovies, message: SuccessMessages.MOVIE_ARRAY_RETRIEVED });
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  }
  
  public async getMovieById(req: Request, res: Response) {
    try {
      const foundMovie = await movieService.getMovieById(req.params.movieId);

      return res.status(200).json({ data: foundMovie.reviews, message: SuccessMessages.MOVIE_RETRIEVED })
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  }
  
  public async cloneMovie(req: Request, res: Response) {
    try {
      const clonedMovie = await movieService.cloneMovie(req.params.movieId);

      return res.status(200).json({ data: clonedMovie, message: SuccessMessages.MOVIE_CLONED });
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  };
  
  public async deleteMovie(req: Request, res: Response) {
    try {
      await movieService.deleteMovie(req.params.movieId);
  
      return res.status(200).json({ message: SuccessMessages.MOVIE_DELETED })
    } catch (error) {
      return res.status(400).send({ error: error.message, description: error.description });
    }
  };
}