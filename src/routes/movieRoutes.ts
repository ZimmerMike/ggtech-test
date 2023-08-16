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

router.post('/', createMovie);
router.get('/:id', getMovieById);
router.post('/:id/clone', cloneMovie);
router.delete('/:id', deleteMovie);
router.post('/:id/reviews', createReview);
router.get('/:id/reviews', getMovieReviews);

export default router;