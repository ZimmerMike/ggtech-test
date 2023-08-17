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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.cloneMovie = exports.getMovieById = exports.createMovie = void 0;
const movieService_1 = require("../services/movieService");
const movieServie = new movieService_1.MovieService();
// Import other necessary models and services
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdMovie = yield movieServie.createMovie(req.body);
        return res.status(200).json({ data: createdMovie, message: 'Movie created succesfully!' });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.createMovie = createMovie;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundMovie = yield movieServie.getMovieById(req.params.movieId);
        return res.status(200).json({ data: foundMovie, message: 'Movie found' });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.getMovieById = getMovieById;
const cloneMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement clone movie logic
});
exports.cloneMovie = cloneMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield movieServie.deleteMovie(req.params.movieId);
        return res.status(200).json({ message: 'Movie was deleted successfully!' });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.deleteMovie = deleteMovie;
