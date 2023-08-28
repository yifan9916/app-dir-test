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
      className={`${styles.slider} h-full w-full flex flex-col justify-between`}
      style={{ '--item-index': state.currentSlideIndex } as CSSProperties}
      ref={sliderRef}
    >
      <div
        className={`${styles.slides} flex text-white transition-transform mb-6`}
      >
        {items.map((item) => (
          <Slide key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-end pr-5 text-white pb-7">
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
};

const Slide = (props: SlideProps) => {
  const { item } = props;

  return (
    <Link
      href={`/episode/${item.id}`}
      className={`${styles.slide} shrink-0 grow-0 pr-6`}
    >
      <div className="absolute w-7 h-7 bg-white flex justify-center items-center text-black font-bold">
        {item.episode}
      </div>

      <Image
        src={item.img}
        alt={item.plot}
        width={1920}
        height={1080}
        className="mb-5 aspect-[3/2] w-full object-cover"
      />
      <h3 className="mb-2 font-bold text-ellipsis overflow-hidden whitespace-nowrap">
        {item.title}
      </h3>
      <p className="max-h-[3rem] overflow-hidden text-xs">{item.plot}</p>
    </Link>
  );
};
