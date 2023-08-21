import { IReview, IReviewsByPlatforms } from "../models/ReviewModel";

export interface ReviewRepository {
    createReview(movieId: string, platformId: string, reviewData: Partial<IReview>): Promise<IReview>;
    getMovieReviews(movieId: string): Promise<Array<IReview>>;
    getMovieReviewGroupedByPlatform(movieId: string): Promise<Array<IReviewsByPlatforms>>
}