'use client';

import { Slider, Episode } from '../slider/slider';

type Props = {
  episodes: Episode[];
};

export const EpisodeSection = (props: Props) => {
  const { episodes } = props;

  const handleSlideClick = (slide: Episode) => {
    console.log('SLIDE CLICK:', slide);
  };

  return (
    <div className="px-4">
      <Slider items={episodes} onSlideClick={handleSlideClick} />
    </div>
  );
};
