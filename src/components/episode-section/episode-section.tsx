'use client';

import { Slider, Episode } from '../slider/slider';

type Props = {
  episodes: Episode[];
};

export const EpisodeSection = (props: Props) => {
  const { episodes } = props;

  return (
    <div className="px-4 xl:pl-20 lg:h-[35vh]">
      <Slider items={episodes} />
    </div>
  );
};
