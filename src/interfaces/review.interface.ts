export interface ReviewCreationBody {
	movie: string;
  platform: string;
  author: string;
	body: string;
	score: number;
	createdAt: Date;
  updatedAt: Date;
}