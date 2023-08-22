import { ErrorMessages } from "../responseMessages";
import { Exception } from "../domain/exception";
import { IMovie } from "../domain/models/MovieModel";
import { MongoMovieRepository } from "../adapters/database/repositories/MongoMovieRepository";
import { MongoPlatformRepository } from "../adapters/database/repositories/MongoPlatformRepository";
import { MongoReviewRepository } from "../adapters/database/repositories/MongoReviewRepository";

const movieRepository = new MongoMovieRepository();
const platformRepository = new MongoPlatformRepository();
const reviewRepository = new MongoReviewRepository();

export class MovieService {

	/**
	 * @description Bussiness logic to create a new movie.
	 * @param {Partial<IMovie>} movieData - Movie data to be added to database.
	 * @returns {Promise<IMovie>} Promise with created movie information.
	 */
	public async createMovie(movieData: Partial<IMovie>): Promise<IMovie> {
		try {
			await this.validatePlatform(movieData.platforms);
			movieData.slug = this.generateSlug(movieData.title);
			const movieCreated = await movieRepository.createMovie(movieData);

			return movieCreated;
		} catch (error) {
			throw new Exception(ErrorMessages.ERROR_CREATING_MOVIE, `An error occurred while creating the movie. ${error} - ${error.description}`);
		}
	}

	/**
	 * @description Generates a url for the movie from movie`s title.
	 * @param {string} movieTitle - Movie title to be formatted as a url replacing blank spaces with dashes.
	 * @returns {string} String with generated movie url.
	 */
	private generateSlug(movieTitle: string): string {
		movieTitle = movieTitle.replace(/ /g, '-').toLowerCase();

		return movieTitle;
	}

	/**
	 * @description Validates if request body contains a platform for the movie.
	 * @param platforms - Array with platforms that movie belongs to.
	 */
	private async validatePlatform(platforms: Array<string>): Promise<void> {
		const availablePlatforms = await platformRepository.getPlatforms();
		if (!platforms?.length) {
			throw new Exception(ErrorMessages.ERROR_PLATFORM_REQUIRED, ErrorMessages.PLATFORM_REQUIRED_DESCRIPTION);
		}
		for (const platformId of platforms) {
			if (!availablePlatforms.find(platform => platform._id.toString() === platformId.toString())) {
				throw new Exception(ErrorMessages.ERROR_INVALID_PLATFORM, `Platform with id '${platformId}' doesn't exist, verify the information.`);
			}
		}
	}

	/**
	 * @description Function with logic to clone a movie getting data from a registered movie.
	 * @param {string} movieId - ObjectId from movie that has to be cloned.
	 * @returns {Promise<IMovie>} - Promise with cloned movie information.
	 */
	public async cloneMovie(movieId: string): Promise<IMovie> {
		try {
			const movieToClone = await movieRepository.findMovieById(movieId);

			if (!movieToClone) {
				throw new Exception(ErrorMessages.ERROR_MOVIE_NOT_FOUND, `Movie with id '${movieId}' was not found and can't be cloned.`);
			}

			const clonedMovieData = this.createClonedMovieData(movieToClone);
			
			const clonedMovie = await this.createMovie(clonedMovieData);

			return clonedMovie;
		} catch (error) {
			throw new Exception(ErrorMessages.ERROR_CLONING_MOVIE, `An error occurred while cloning the movie. ${error} - ${error.description}`);
		}
	}

	/**
	 * @description Creates an object with partial movie data to be cloned.
	 * @param {IMovie} movieToClone - Registered movie full data to be mapped.
	 * @returns {Partial<IMovie>} Mapped data to create a new movie.
	 */
	private createClonedMovieData(movieToClone: IMovie): Partial<IMovie> {
		const clonedMovieData: Partial<IMovie> = {
			title: movieToClone.title += ' (clon)',
			image: movieToClone.image,
			director: movieToClone.director,
			platforms: movieToClone.platforms.map(platformId => platformId.toString())
		};

		return clonedMovieData;
	}

	/**
	 * @description Deletes a movie from database usin the movie ObjectId.
	 * @param {string} movieId - ObjectId from the movie that has to be deleted from database.
	 */
	public async deleteMovie(movieId: string): Promise<void> {
		try {
			await movieRepository.deleteMovie(movieId);
		} catch (error) {
			throw new Exception(ErrorMessages.ERROR_DELETING_MOVIE, `An error occurred while deleting the movie. ${error} - ${error.description}`);
		}
	}

	/**
	 * @description Gets a movie information and also retrieves all movie reviews grouped by platform.
	 * @param {string} movieId - ObjectId from movie that has to be deleted.
	 * @returns {Promise<IMovie>} Full movie information with reviews grouped by platform mapped in 'reviews' array.
	 */
	public async getMovieById(movieId: string): Promise<IMovie> {
		try {
			const movieFound = await movieRepository.findMovieById(movieId);
			const movieReviewsByPlatform = await reviewRepository.getMovieReviewGroupedByPlatform(movieId);
			movieFound.reviews = movieReviewsByPlatform;

			return movieFound;
		} catch (error) {
			throw new Exception(ErrorMessages.ERROR_RETRIEVING_MOVIE, `An error ocurred while retrieving movie information. ${error} - ${error.description}`);
		}
	}
}
