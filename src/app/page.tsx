import * as Omdb from '@/libs/omdb-api';
import { Main } from '@/components/main/main';

export default async function Home() {
  const seriesId = 'tt5743796'; // tt5743796, tt0108778
  const seriesData = await Omdb.fetchSeriesById(seriesId);
  const seasonData = await Omdb.fetchSeasonEpisodes(1, seriesId);
  const { episodes } = await await Omdb.fetchAllEpisodeDetails(
    seasonData.Episodes,
  );

  // main needs to be a separate client component to enable both server rendering and client updates
  return <Main series={seriesData} season={seasonData} episodes={episodes} />;
}
