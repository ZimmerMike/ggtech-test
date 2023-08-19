import { Exception } from "../domain/exception";
import { Movie, MovieCreationBody } from "../interfaces/movie.interface";
import MovieSchema from "../domain/models/Movie";
import { ReviewService } from "./reviewService";

const reviewService = new ReviewService();

export class MovieService {
  
	public async createMovie(movieData: MovieCreationBody) {
		try {
			this.validatePlatform(movieData.platforms);
			movieData.createdAt = new Date();
			movieData.slug = this.generateSlug(movieData.title);
			const movieCreated = await MovieSchema.create(movieData);
	
			return movieCreated;
		} catch (error) {
      console.log(error)
			throw new Exception('ERROR_CREATING_MOVIE', 'Ocurrió un error al crear la pelicula.');
		}
	}

	public generateSlug(movieTitle: string): string {
		movieTitle = movieTitle.replace(/ /g, '-').toLowerCase();

		return movieTitle;
	}

	public validatePlatform(platforms: Array<string>) {
		if (!platforms?.length) {
			throw new Exception('PLATFORM_REQUIRED', 'La pelicula debe estar en al menos una plataforma.');
		}
	}

  public async updateMovieReviewsAndScore(movieId: string): Promise<void> {
    try {
      const movieData: Movie = await MovieSchema.findById(movieId);
      const averageScore = await reviewService.calculateMovieScore(movieData.reviews);
      await MovieSchema.findByIdAndUpdate(movieData._id, { score: averageScore });
    } catch (error) {
      throw new Exception('ERROR_CALCULATING_SCORE', 'Ocurrió un error al calcular la puntuación de la pelicula.');
    }
  }
  
  public async updateReviewsInMovie(movieId: string, newReview: string) {
    try {
      await MovieSchema.findByIdAndUpdate(movieId, { reviews: { $push: newReview } });
    } catch (error) {
      throw new Exception('ERROR_ADDING_REVIEW', 'Ocurrió un error al agregar la reseña a la pelicula.');
    }
  }

	public async getMovieById(movieId: string) {
		try {
			const foundMovie = await MovieSchema.findById(movieId);

			return foundMovie;
		} catch (error) {
			throw new Exception('ERROR_GETTING_MOVIE', 'Ocurrió un error al obtener la información de la pelicula.');
		}
	}

	public async deleteMovie(movieId: string) {
		try {
			await MovieSchema.deleteOne({ _id: movieId });
		} catch (error) {
			throw new Exception('ERROR_REMOVING_MOVIE', 'Ocurrió un error al eliminar la pelicula.');
		}
	}
}