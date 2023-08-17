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
exports.getMovieReviews = exports.createReview = void 0;
const reviewService_1 = require("../services/reviewService");
const reviewServie = new reviewService_1.ReviewService();
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdReview = yield reviewServie.createReview(req.body, req.params.movieId, req.params.platformId);
        return res.status(200).json({ data: createdReview, message: 'Review posted successfully!' });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.createReview = createReview;
const getMovieReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundReviews = yield reviewServie.getReviewsByMovie(req.params.movieId);
        return res.status(200).json({ data: foundReviews, message: 'Reviews found for this movie' });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.getMovieReviews = getMovieReviews;
