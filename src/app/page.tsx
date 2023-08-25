import * as Omdb from '@/libs/omdb-api';

export default async function Home() {
  const seriesData = await Omdb.fetchSeriesById();
  const seasonData = await Omdb.fetchSeasonEpisodes(1);
  const episodeDetails = await (
    await Omdb.fetchAllEpisodeDetails(seasonData.Episodes)
  ).episodes;

  console.log(episodeDetails);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="p-20 text-white">
        <p className="mb-2 text-xl">Season {seasonData.Season}</p>
        <h1 className="mb-1 text-6xl font-bold">{seriesData.Title}</h1>
        <p className="w-2/3 text-lg">{seriesData.Plot}</p>
      </div>
    </main>
  );
}
