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
exports.ReviewService = void 0;
const exception_1 = require("../domain/exception");
const Review_1 = __importDefault(require("../models/Review"));
class ReviewService {
    createReview(reviewData, movieId, platformId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                reviewData.movie = movieId;
                reviewData.platform = platformId;
                reviewData.createdAt = new Date();
                reviewData.updatedAt = new Date();
                const reviewCreated = yield Review_1.default.create(reviewData);
                return reviewCreated;
            }
            catch (error) {
                throw new exception_1.Exception('ERROR_POSTING_REVIEW', 'Ocurrió un error al publicar la reseña.');
            }
        });
    }
    getReviewsByMovie(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewsFound = yield Review_1.default.aggregate([
                    {
                        $match: {
                            movie: movieId
                        }
                    },
                    {
                        $lookup: {
                            from: 'platforms',
                            localField: 'platform',
                            foreignField: '_id',
                            as: 'platform',
                        },
                    },
                    {
                        $group: {
                            _id: '$platform',
                            reviews: { $push: '$$ROOT' }
                        }
                    },
                    {
                        $project: {
                            platform: { $arrayElemAt: ['$reviews.platform', 0] },
                            reviews: 1,
                        },
                    },
                ]);
                return reviewsFound;
            }
            catch (error) {
                console.log(error);
                throw new exception_1.Exception('ERROR_GETTING_MOVIE_REVIEWS', 'Ocurrió un error al obtener las reseñas de la pelicula.');
            }
        });
    }
}
exports.ReviewService = ReviewService;
