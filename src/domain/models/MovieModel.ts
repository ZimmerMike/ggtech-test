import { IReviewsByPlatforms } from "./ReviewModel";

export interface IMovie {
	_id: string;
	title: string;
	slug: string;
	image: string;
	director: string;
	platforms: Array<string>;
	score: number;
	createdAt: Date;
	updatedAt: Date;
	reviews: Array<IReviewsByPlatforms | string>;
}
