export interface IReview {
  _id: string;
  movie: string;
  platform: string;
  author: string;
  body: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewsByPlatforms {
  _id: string;
  reviews: Array<IReview>;
}
