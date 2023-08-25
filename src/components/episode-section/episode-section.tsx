'use client';

import { Slider, Episode } from '../slider/slider';

type Props = {
  episodes: Episode[];
};

export const EpisodeSection = (props: Props) => {
  const { episodes } = props;

  return (
    <div className="px-4">
      <Slider items={episodes} />
    </div>
  );
};
