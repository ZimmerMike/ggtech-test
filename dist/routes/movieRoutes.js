"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const reviewController_1 = require("../controllers/reviewController");
const router = express_1.default.Router();
router.post('/create', movieController_1.createMovie);
router.get('/movie/:movieId/getOne', movieController_1.getMovieById);
router.post('/movie/:movieId/clone', movieController_1.cloneMovie);
router.delete('/movie/:movieId/delete', movieController_1.deleteMovie);
router.post('/movie/:movieId/platform/:platformId/reviews', reviewController_1.createReview);
router.get('/movie/:movieId/reviews', reviewController_1.getMovieReviews);
exports.default = router;
