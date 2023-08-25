'use client';

import styles from './slider.module.css';

import { CSSProperties, ElementRef, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const [itemIndex, setItemIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(2);

  const totalItemsCount = items.length;
  const lastItemIndex = items.length - 1;

  useEffect(() => {
    if (!sliderRef.current) return;

    const styleValue = parseInt(
      getComputedStyle(sliderRef.current).getPropertyValue(
        '--slides-per-screen'
      ),
      10
    );

    setItemsPerScreen(styleValue);
  }, []);

  const handleSlideLeft = () => {
    if (itemIndex === 0) return;

    const nextIndex = itemIndex - itemsPerScreen;
    const newIndex = nextIndex <= 0 ? 0 : nextIndex;
    setItemIndex(newIndex);
  };

  const handleSlideRight = () => {
    if (itemIndex >= lastItemIndex) return;

    const nextIndex = itemIndex + itemsPerScreen;
    const newIndex = nextIndex >= totalItemsCount ? lastItemIndex : nextIndex;
    setItemIndex(newIndex);
  };

  return (
    <div
      className={`${styles.slider} h-full w-full`}
      style={{ '--item-index': itemIndex } as CSSProperties}
      ref={sliderRef}
    >
      <div className={`${styles.slides} flex text-white transition-transform`}>
        {items.map((item) => (
          <Slide key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-end p-8 text-white">
        <button onClick={handleSlideLeft}>Left</button>
        <button onClick={handleSlideRight}>Right</button>
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
      <Image
        src={item.img}
        alt={item.plot}
        width={1920}
        height={1080}
        className="mb-4 aspect-video w-full object-cover"
      />
      <h3 className="mb-1 font-bold">
        {item.title} - {item.id}
      </h3>
      <p className="h-12 overflow-hidden break-all">{item.plot}</p>
    </Link>
  );
};
