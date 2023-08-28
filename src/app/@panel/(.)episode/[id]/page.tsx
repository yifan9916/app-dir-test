import Image from 'next/image';

import * as Omdb from '@/libs/omdb-api';
import { Star } from '@/components/icons';
import { BackButton } from '@/components/back-button/back-button';

// TODO close modal/route back to overview page when clicking outside of the episode card

// BUG: there seems to be an issue with closing parallel + intercepted route modals
// https://github.com/vercel/next.js/issues/49662

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
    <div className="absolute z-10 h-screen w-screen p-4 bg-[rgba(0,0,0,0.7)] lg:relative lg:p-0 lg:bg-none lg:basis-1/3 lg:grow-0 lg:shrink-0">
      <div className="absolute text-white p-2 lg:hidden">
        <BackButton />
      </div>
      <div className="rounded bg-white h-full w-full max-w-2xl lg:rounded-none mx-auto flex flex-col">
        <Image
          src={episode.img}
          alt={episode.plot}
          height={1920}
          width={1080}
          quality={100}
          priority
          className="w-full object-cover flex lg:basis-[65vh] lg:max-h-[65vh] grow-1 shrink-1"
        />

        <div className="lg:h-[35vh] overflow-scroll">
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
            <h2 className="mb-2 text-2xl font-bold">{episode.title}</h2>
            <p>{episode.plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
