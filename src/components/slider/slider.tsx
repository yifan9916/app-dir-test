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
  const { state, dispatch } = useSlider(sliderRef, items);

  const handleSlideLeft = () => {
    dispatch({ type: 'slide_left' });
  };

  const handleSlideRight = () => {
    dispatch({ type: 'slide_right' });
  };

  return (
    <div
      className={`${styles.slider} flex h-full w-full flex-col`}
      style={{ '--item-index': state.currentSlideIndex } as CSSProperties}
      ref={sliderRef}
    >
      <div
        className={`${styles.slides} mb-6 flex text-white transition-transform`}
      >
        {items.map((item, index) => (
          <Slide
            key={item.id}
            item={item}
            isPriority={index <= state.slidesPerScreen}
          />
        ))}
      </div>

      <div className="flex justify-end pb-7 pr-5 text-white">
        <button
          aria-label="Slide Left"
          onClick={handleSlideLeft}
          disabled={state.isAtBeginning}
          className="disabled:text-gray-400"
        >
          <Arrow style={{ transform: 'scaleX(-1)' }} className="mr-4" />
        </button>
        <button
          aria-label="Slide Right"
          onClick={handleSlideRight}
          disabled={state.isAtEnd}
          className="disabled:text-gray-400"
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
};

type SlideProps = {
  item: Episode;
  isPriority?: boolean;
};

const Slide = (props: SlideProps) => {
  const { item, isPriority } = props;

  return (
    <Link
      href={`/episode/${item.id}`}
      className={`${styles.slide} shrink-0 grow-0 pr-6`}
    >
      <div className="absolute flex h-7 w-7 items-center justify-center bg-white font-bold text-black">
        {item.episode}
      </div>

      <Image
        src={item.img}
        alt={item.plot}
        width={1920}
        height={1080}
        quality={100}
        priority={isPriority}
        className="mb-5 aspect-[3/2] w-full object-cover"
      />
      <h3 className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap font-bold">
        {item.title}
      </h3>
      <p className="max-h-[3rem] overflow-hidden text-xs">{item.plot}</p>
    </Link>
  );
};
