type Rating = {
  Source: string;
  Value: string;
};

export type OMDBSeries = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string | number;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons: string | number;
  Response: string;
};

export type OMDBEpisodes = {
  Title: string;
  Season: string | number;
  totalSeasons: string | number;
  Episodes: {
    Title: string;
    Released: string;
    Episode: string | number;
    imdbRating: string | number;
    imdbID: string;
  }[];
  Response: string;
};

export type OMDBEpisode = {
  Title: string;
  Year: string | number;
  Rated: string;
  Released: string;
  Season: string | number;
  Episode: string | number;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string | number;
  imdbVotes: string | number;
  imdbID: string;
  seriesID: string;
  Type: string;
  Response: string;
};
