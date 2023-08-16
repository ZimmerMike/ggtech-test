import express from 'express';
import {
  createMovie,
  getMovieById,
  cloneMovie,
  deleteMovie,
  createReview,
  getMovieReviews,
} from '../controllers/movieController';

const router = express.Router();

router.post('/create', createMovie);
router.get('movieId/:id/getOne', getMovieById);
router.post('movieId/:id/clone', cloneMovie);
router.delete('movieId/:id/delete', deleteMovie);
router.post('movieId/:id/reviews', createReview);
router.get('movieId/:id/reviews', getMovieReviews);

export default router;