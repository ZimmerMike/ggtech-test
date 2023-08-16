"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const router = express_1.default.Router();
router.post('/', movieController_1.createMovie);
router.get('/:id', movieController_1.getMovieById);
router.post('/:id/clone', movieController_1.cloneMovie);
router.delete('/:id', movieController_1.deleteMovie);
router.post('/:id/reviews', movieController_1.createReview);
router.get('/:id/reviews', movieController_1.getMovieReviews);
exports.default = router;
