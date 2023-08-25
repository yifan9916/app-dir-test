import Image from 'next/image';

import * as Omdb from '@/libs/omdb-api';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page(props: Props) {
  const { params } = props;

  const omdbEpisode = await Omdb.fetchEpisodeById(params.id);
  const episode = Omdb.processEpisode(omdbEpisode);

  return (
    <div className="absolute z-10 h-screen w-screen p-4 bg-[rgba(0,0,0,0.7)] md:relative md:p-0 md:bg-none md:basis-1/3 md:grow-0 md:shrink-0">
      <div className="rounded overflow-hidden bg-white h-full w-full">
        <Image
          src={episode.img}
          alt={episode.plot}
          height={1920}
          width={1080}
          className="max-h-[66vh] w-full object-cover"
        />

        <div>
          <div className="flex justify-between border-b p-10">
            <span>
              Episode {episode.episode} - {episode.releaseDate}
            </span>{' '}
            <span>
              <b>{episode.rating}</b>/10
            </span>
          </div>

          <div className="p-10">
            <h1 className="mb-2 text-2xl font-bold">{episode.title}</h1>
            <p>{episode.plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
