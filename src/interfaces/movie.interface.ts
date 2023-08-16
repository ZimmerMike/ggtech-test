export interface MovieCreationBody {
    title: string;
    slug?: string;
    image: string;
    director: string;
    platform: Array<string>;
    score?: number;
    createdAt?: Date;
    updatedAt?: Date;
    reviews?: Array<string>;
}