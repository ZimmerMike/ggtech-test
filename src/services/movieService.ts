import { Exception } from "../domain/exception";
import { MovieCreationBody } from "../interfaces/movie.interface";
import Movie from "../models/Movie";

export class MovieService {
	public async createMovie(movieData: MovieCreationBody) {
		try {
			this.validatePlatform(movieData.platform);
			movieData.createdAt = new Date();
			movieData.slug = this.generateSlug(movieData.title);
			const movieCreated = await Movie.create(movieData);
	
			return movieCreated;
		} catch (error) {
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

	public async getMovieById(movieId: string) {
		try {
			const foundMovie = await Movie.findById(movieId);

			return foundMovie;
		} catch (error) {
			throw new Exception('ERROR_GETTING_MOVIE', 'Ocurrió un error al obtener la información de la pelicula.');
		}
	}

	public async deleteMovie(movieId: string) {
		try {
			await Movie.deleteOne({ _id: movieId });
		} catch (error) {
			throw new Exception('ERROR_REMOVING_MOVIE', 'Ocurrió un error al eliminar la pelicula.');
		}
	}
}