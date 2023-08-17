import express from 'express';
import {
  createMovie,
  getMovieById,
  cloneMovie,
  deleteMovie
} from '../controllers/movieController';
import {
  createReview,
  getMovieReviews
} from '../controllers/reviewController';

const router = express.Router();

router.post('/create', createMovie);
router.get('/movie/:movieId/getOne', getMovieById);
router.post('/movie/:movieId/clone', cloneMovie);
router.delete('/movie/:movieId/delete', deleteMovie);
router.post('/movie/:movieId/platform/:platformId/reviews', createReview);
router.get('/movie/:movieId/reviews', getMovieReviews);

export default router;