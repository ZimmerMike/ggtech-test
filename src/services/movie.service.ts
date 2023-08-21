import { IMovie } from "../domain/models/MovieModel";
import { MongoMovieRepository } from "../adapters/database/repositories/MongoMovieRepository";
import { Exception } from "../domain/exception";
import { MongoPlatformRepository } from "../adapters/database/repositories/MongoPlatformRepository";
import { MongoReviewRepository } from "../adapters/database/repositories/MongoReviewRepository";

const movieRepository = new MongoMovieRepository();
const platformRepository = new MongoPlatformRepository();
const reviewRepository = new MongoReviewRepository();

export class MovieService {

	/**
	 * @description Bussiness logic to create a new movie.
	 * @param movieData - Movie data to be added to database.
	 * @returns Created movie information.
	 */
	public async createMovie(movieData: Partial<IMovie>): Promise<IMovie> {
		try {
			await this.validatePlatform(movieData.platforms);
			movieData.slug = this.generateSlug(movieData.title);
			const movieCreated = await movieRepository.createMovie(movieData);

			return movieCreated;
		} catch (error) {
			throw new Exception('ERROR_CREATING_MOVIE', `Ocurrió un error al crear la pelicula. ${error} - ${error.description}`);
		}
	}

	/**
	 * @description Generates a url for the movie from movie`s title.
	 * @param movieTitle - Movie title to be formatted as a url replacing blank spaces with dashes.
	 * @returns String with generated movie url.
	 */
	public generateSlug(movieTitle: string): string {
		movieTitle = movieTitle.replace(/ /g, '-').toLowerCase();

		return movieTitle;
	}

	/**
	 * @description Validates if request body contains a platform for the movie.
	 * @param platforms - Array with platforms that movie belongs to.
	 */
	public async validatePlatform(platforms: Array<string>): Promise<void> {
		const availablePlatforms = await platformRepository.getPlatforms();
		console.log(availablePlatforms)
		if (!platforms?.length) {
			throw new Exception('PLATFORM_REQUIRED', `La pelicula debe estar en al menos una plataforma.`);
		}
		for (const platformId of platforms) {
			if (!availablePlatforms.find(platform => platform._id.toString() === platformId)) {
				throw new Exception('INVALID_PLATFORM', `La plataforma con id '${platformId}' no existe, verifique la informacion.`);
			}
		}
	}

	public async cloneMovie(movieId: string): Promise<IMovie> {
		try {
			const movieToClone = await movieRepository.findMovieById(movieId);

			if (!movieToClone) {
				throw new Exception('MOVIE_NOT_FOUND', `La pelicula con id ${movieId} no fue encontrada y no se puede clonar.`);
			}

			movieToClone._id = undefined;
			const clonedMovie = await movieRepository.createMovie(movieToClone);

			return clonedMovie;
		} catch (error) {
			throw new Exception('ERROR_CLONING_MOVIE', 'Ocurrió un error al clonar la pelicula.')
		}
	}

	public async deleteMovie(movieId: string) {
		try {
			await movieRepository.deleteMovie(movieId);
		} catch (error) {
			throw new Exception('ERROR_DELETING_MOVIE', `Ocurrió un error al eliminar la pelicula.`);
		}
	}

	public async getMovieById(movieId: string): Promise<IMovie> {
		try {
			const movieFound = await movieRepository.findMovieById(movieId);
			movieFound.reviews = await reviewRepository.getMovieReviewGroupedByPlatform(movieId);

			return movieFound;
		} catch (error) {
			throw new Exception('ERROR_RETRIEVING_MOVIE', `Ocurrió un error al obtener la información de la pelicula.`);
		}
	}
}
