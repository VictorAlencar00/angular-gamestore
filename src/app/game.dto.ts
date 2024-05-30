export interface Game {
  id?: number;
  name: string;
  verticalsrc: string;
  horizontalsrc: string;
  genre: string;
  liked: boolean;
  publisher: string;
  developer: string;
  releaseDate: Date;
  price: number;
}
