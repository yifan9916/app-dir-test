'use client';

import { useRouter } from 'next/navigation';

import { Arrow } from '../icons';

// BUG: there seems to be an issue with closing parallel + intercepted route modals
// https://github.com/vercel/next.js/issues/49662
export const BackButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.replace('/');
  };

  return (
    <button aria-label="Slide Left" onClick={handleClick}>
      <Arrow style={{ transform: 'scaleX(-1)' }} className="mr-4" />
    </button>
  );
};
