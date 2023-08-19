export interface MovieCreationBody {
  title: string;
  slug?: string;
  image: string;
  director: string;
  platforms: Array<string>;
  score?: number;
  createdAt?: Date;
  updatedAt?: Date;
  reviews?: Array<string>;
}

export interface Movie {
  _id: string;
  createdAt: Date;
  director: string;
  image: string;
  platforms: Array<string>;
  reviews: Array<string>;
  score: number;
  slug: string;
  title: string;
  updatedAt: Date;
}