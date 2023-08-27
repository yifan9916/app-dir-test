import Image from 'next/image';

import * as Omdb from '@/libs/omdb-api';
import { Star } from '@/components/icons';

type Props = {
  params: {
    id: string;
  };
};

// TODO close modal/route back to overview page when clicking outside of the episode card

export default async function Page(props: Props) {
  const { params } = props;

  const omdbEpisode = await Omdb.fetchEpisodeById(params.id);
  const episode = Omdb.processEpisode(omdbEpisode);

  return (
    <div className="absolute z-10 h-screen w-screen p-4 bg-[rgba(0,0,0,0.7)] lg:relative lg:p-0 lg:bg-none lg:basis-1/3 lg:grow-0 lg:shrink-0">
      <div className="rounded overflow-scroll bg-white h-full w-full max-w-2xl lg:rounded-none mx-auto">
        <Image
          src={episode.img}
          alt={episode.plot}
          height={1920}
          width={1080}
          className="max-h-[66vh] w-full object-cover aspect-[5/4] md:aspect-[16/9] lg:aspect-[5/4]"
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
    </div>
  );
}
