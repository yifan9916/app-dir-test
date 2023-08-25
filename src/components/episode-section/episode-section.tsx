'use client';

import { Carousel, Episode } from '../carousel/carousel';

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
      <Carousel items={episodes} onSlideClick={handleSlideClick} />
    </div>
  );
};
