"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const exception_1 = require("../domain/exception");
const Movie_1 = __importDefault(require("../models/Movie"));
class MovieService {
    createMovie(movieData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validatePlatform(movieData.platform);
                movieData.createdAt = new Date();
                movieData.slug = this.generateSlug(movieData.title);
                const movieCreated = yield Movie_1.default.create(movieData);
                return movieCreated;
            }
            catch (error) {
                throw new exception_1.Exception('ERROR_CREATING_MOVIE', 'Ocurrió un error al crear la pelicula.');
            }
        });
    }
    generateSlug(movieTitle) {
        movieTitle = movieTitle.replace(/ /g, '-').toLowerCase();
        return movieTitle;
    }
    validatePlatform(platforms) {
        if (!(platforms === null || platforms === void 0 ? void 0 : platforms.length)) {
            throw new exception_1.Exception('PLATFORM_REQUIRED', 'La pelicula debe estar en al menos una plataforma.');
        }
    }
    getMovieById(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundMovie = yield Movie_1.default.findById(movieId);
                return foundMovie;
            }
            catch (error) {
                throw new exception_1.Exception('ERROR_GETTING_MOVIE', 'Ocurrió un error al obtener la información de la pelicula.');
            }
        });
    }
    deleteMovie(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Movie_1.default.deleteOne({ _id: movieId });
            }
            catch (error) {
                throw new exception_1.Exception('ERROR_REMOVING_MOVIE', 'Ocurrió un error al eliminar la pelicula.');
            }
        });
    }
}
exports.MovieService = MovieService;
