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
    <div className="absolute z-10 h-screen w-screen bg-[rgba(0,0,0,0.7)] p-4 lg:relative lg:shrink-0 lg:grow-0 lg:basis-1/3 lg:bg-none lg:p-0">
      <div className="absolute p-2 text-white lg:hidden">
        <BackButton />
      </div>
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col overflow-hidden rounded bg-white lg:max-w-none lg:rounded-none">
        <Image
          src={episode.img}
          alt={episode.plot}
          height={1920}
          width={1080}
          quality={100}
          priority
          className="grow-1 shrink-1 flex w-full object-cover lg:max-h-[65vh] lg:basis-[65vh]"
        />

        <div className="overflow-scroll lg:h-[35vh]">
          <div className="flex items-end justify-between border-b p-5 xl:p-10">
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
