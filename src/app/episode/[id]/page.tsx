import Image from 'next/image';

import * as Omdb from '@/libs/omdb-api';
import { Star } from '@/components/icons';

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
    <div className="bg-white max-w-2xl mx-auto">
      <Image
        src={episode.img}
        alt={episode.plot}
        height={1920}
        width={1080}
        quality={100}
        priority
        className="w-full object-cover aspect-video"
      />

      <div>
        <div className="flex justify-between border-b p-5 items-end xl:p-10">
          <span>
            Episode {episode.episode} — {episode.releaseDate}
          </span>{' '}
          <span className="flex items-end">
            <Star className="mr-4" />
            <span>
              <b>{episode.rating}</b>/10
            </span>
          </span>
        </div>

        <div className="p-5 xl:p-10">
          <h1 className="mb-2 text-2xl font-bold">{episode.title}</h1>
          <p>{episode.plot}</p>
        </div>
      </div>
    </div>
  );
}
