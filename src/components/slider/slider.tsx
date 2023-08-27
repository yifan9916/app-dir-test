'use client';

import styles from './slider.module.css';

import { CSSProperties, ElementRef, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Arrow } from '../icons';
import { useSlider } from './use-slider';

// TODO make carousel generic
export type Episode = {
  id: string | number;
  episode: string | number;
  title: string;
  img: string;
  plot: string;
  releaseDate: string;
  rating?: string | number;
};

type Props = {
  items: Episode[];
};

export const Slider = (props: Props) => {
  const { items } = props;

  const sliderRef = useRef<ElementRef<'div'>>(null);
  const { state, dispatch } = useSlider<Episode>(items, sliderRef);

  const handleSlideLeft = () => {
    dispatch({ type: 'slide_left' });
  };

  const handleSlideRight = () => {
    dispatch({ type: 'slide_right' });
  };

  // TODO style disabled attribute with tailwind
  const arrowClassLeft = state.isAtBeginning ? ' text-gray-400' : '';
  const arrowClassRight = state.isAtEnd ? ' text-gray-400' : '';

  return (
    <div
      className={`${styles.slider} h-full w-full`}
      style={{ '--item-index': state.currentSlideIndex } as CSSProperties}
      ref={sliderRef}
    >
      <div className={`${styles.slides} flex text-white transition-transform`}>
        {items.map((item) => (
          <Slide key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-end p-4 text-white">
        <button onClick={handleSlideLeft} disabled={state.isAtBeginning}>
          <Arrow
            style={{ transform: 'scaleX(-1)' }}
            className={`mr-4${arrowClassLeft}`}
          />
        </button>
        <button onClick={handleSlideRight} disabled={state.isAtEnd}>
          <Arrow className={arrowClassRight} />
        </button>
      </div>
    </div>
  );
};

type SlideProps = {
  item: Episode;
};

const Slide = (props: SlideProps) => {
  const { item } = props;

  return (
    <Link
      href={`/episode/${item.id}`}
      className={`${styles.slide} shrink-0 grow-0 pr-4`}
    >
      <div className="absolute w-7 h-7 bg-white flex justify-center items-center text-black font-bold">
        {item.episode}
      </div>
      <Image
        src={item.img}
        alt={item.plot}
        width={1920}
        height={1080}
        className="mb-4 aspect-[3/2] w-full object-cover"
      />
      <h3 className="mb-2 font-bold text-ellipsis overflow-hidden whitespace-nowrap">
        {item.title}
      </h3>
      <p className="max-h-[3rem] overflow-hidden text-xs">{item.plot}</p>
    </Link>
  );
};
