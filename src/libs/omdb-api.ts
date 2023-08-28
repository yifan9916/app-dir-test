import {
  OMDBEpisode,
  OMDBEpisodes,
  OMDBSearchResults,
  OMDBSeries,
} from './types';

type Episode = {
  id: string;
  episode: string | number;
  title: string;
  img: string;
  plot: string;
  releaseDate: string;
  rating?: string | number;
};

const apiKey = process.env.OMDB_API_KEY;

// series using search
// http://www.omdbapi.com/?apikey=6177d11e&s=warrior
// series using title or id
// http://www.omdbapi.com/?apikey=6177d11e&i=tt5743796
// episodes
// http://www.omdbapi.com/?apikey=6177d11e&i=tt5743796&season=1
// single episode data
// http://www.omdbapi.com/?apikey=6177d11e&i=tt5743796&season=1&episode=1

const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

export const fetchSearchTerm = async (
  searchTerm: string
): Promise<OMDBSearchResults['Search']> => {
  const res = await fetch(`/api/omdb/series?search=${searchTerm}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch data for search term: ${searchTerm}`);
  }

  return res.json();
};

export const fetchSeriesByTitle = async (
  title = 'warrior'
): Promise<OMDBSeries> => {
  const res = await fetch(`${baseUrl}&t=${title}`);

  if (!res.ok) {
    throw new Error('Failed to fetch series by title');
  }

  return res.json();
};

export const fetchSeriesById = async (
  id = 'tt5743796'
): Promise<OMDBSeries> => {
  const res = await fetch(`${baseUrl}&i=${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch series by id');
  }

  return res.json();
};

export const fetchSeasonEpisodes = async (
  seasonNumber: number = 1,
  id: string = 'tt5743796'
): Promise<OMDBEpisodes> => {
  const res = await fetch(`${baseUrl}&i=${id}&season=${seasonNumber}`);

  if (!res.ok) {
    throw new Error('Failed to fetch season episodes');
  }

  return res.json();
};

export const processEpisode = (episode: OMDBEpisode): Episode => {
  return {
    id: episode.imdbID,
    episode: episode.Episode,
    title: episode.Title,
    img: episode.Poster,
    plot: episode.Plot,
    rating: episode.imdbRating,
    releaseDate: episode.Released,
  };
};

export const fetchEpisodeById = async (id: string): Promise<OMDBEpisode> => {
  const res = await fetch(`${baseUrl}&i=${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch episode by id');
  }

  return res.json();
};

export const fetchAllEpisodeDetails = async (
  omdbEpisodes: OMDBEpisodes['Episodes']
) => {
  const processedEpisodes = omdbEpisodes.map(async (episode) => {
    const omdbEpisode = await fetchEpisodeById(episode.imdbID);

    return processEpisode(omdbEpisode);
  });

  const results = await Promise.allSettled(processedEpisodes);
  const errors = results.filter((r) => r.status === 'rejected');
  const values = results
    .filter(
      (r): r is PromiseFulfilledResult<Episode> => r.status === 'fulfilled'
    )
    .map((r) => r.value);

  return { errors, episodes: values };
};
