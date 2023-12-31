'use client';

import { useState } from 'react';
import { OMDBEpisodes, OMDBSearchResults, OMDBSeries } from '@/libs/types';
import { SearchBar } from '../search-bar/search-bar';
import { Episode, Slider } from '../slider/slider';

type Props = {
  series: OMDBSeries;
  season: OMDBEpisodes;
  episodes: Episode[];
};

export const Main = (props: Props) => {
  const { series, season, episodes } = props;

  const [seriesData, setSeriesData] = useState(series);
  const [seasonData, setSeasonData] = useState(season);
  const [episodesData, setEpisodesData] = useState(episodes);

  const handleSearchResultClick = async (
    result: OMDBSearchResults['Search'][number],
  ) => {
    try {
      // BUG: there seems to be an issue with closing parallel + intercepted route modals
      // https://github.com/vercel/next.js/issues/49662
      // router.push('/')
      const res = await fetch(`/api/omdb/${result.imdbID}`);
      const data = await res.json();

      setSeriesData(data.seriesData);
      setSeasonData(data.seasonData);
      setEpisodesData(data.episodesData);
    } catch (e) {}
  };

  return (
    <main
      className="flex h-screen flex-col justify-end overflow-x-hidden bg-slate-500 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2),rgba(0,0,0,0.8)),url('${seriesData.Poster}')`,
      }}
    >
      <SearchBar onResultClick={handleSearchResultClick} />

      <div className="px-4 py-10 text-white xl:max-w-2xl xl:pb-28 xl:pl-24">
        <p className="mb-2 text-2xl">Season {seasonData.Season}</p>
        <h1 className="mb-1 text-6xl font-bold">{seriesData.Title}</h1>
        <p className="text-xl">{seriesData.Plot}</p>
      </div>

      {episodesData && (
        <div className="px-4 lg:h-[35vh] xl:pl-20">
          <Slider items={episodesData} />
        </div>
      )}
    </main>
  );
};
