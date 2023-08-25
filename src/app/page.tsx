import * as Omdb from '@/libs/omdb-api';
import { EpisodeSection } from '@/components/episode-section/episode-section';

export default async function Home() {
  const seriesData = await Omdb.fetchSeriesById();
  const seasonData = await Omdb.fetchSeasonEpisodes(1);
  const { episodes } = await await Omdb.fetchAllEpisodeDetails(
    seasonData.Episodes
  );

  return (
    <main
      className="bg-slate-500 flex min-h-screen flex-col bg-cover bg-center bg-no-repeat justify-end overflow-x-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2),rgba(0,0,0,0.8)),url('${seriesData.Poster}')`,
      }}
    >
      <div className="px-4 pb-10 text-white">
        <p className="mb-2 text-xl">Season {seasonData.Season}</p>
        <h1 className="mb-1 text-6xl font-bold">{seriesData.Title}</h1>
        <p className="text-lg">{seriesData.Plot}</p>
      </div>

      <EpisodeSection episodes={episodes} />
    </main>
  );
}
