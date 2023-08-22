import { Application } from 'express';

import { MovieController } from '../controllers/movieController';
import { ReviewController } from '../controllers/reviewController';

export class Routes {
  private movieController: MovieController = new MovieController();
  private reviewController: ReviewController = new ReviewController();

  public routes(app: Application): void {
    app.route('/api/create')
      .post(this.movieController.createMovie);

    app.route('/api/movie/:movieId/getOne')
      .get(this.movieController.getMovieById);

    app.route('/api/movie/:movieId/clone')
      .post(this.movieController.cloneMovie);
    
    app.route('/api/movie/:movieId/delete')
      .delete(this.movieController.deleteMovie);

    app.route('/api/movie/:movieId/platform/:platformId/reviews/create')
      .post(this.reviewController.createReview);
  }
}