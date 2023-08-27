import { SVGProps } from 'react';

export const Star = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 0.692261L18.3237 9.45346L27.9924 10.8587L20.9962 17.678L22.6473 27.3077L14 22.7612L5.35276 27.3077L7.00386 17.678L0.00769043 10.8587L9.67639 9.45346L14 0.692261Z"
        fill="#EFD358"
      />
    </svg>
  );
};

export const Arrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="30"
      height="21"
      viewBox="0 0 30 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0.5 10.5H28.5" stroke="currentColor" />
      <path
        d="M19.5 1.5L28.5 10.5L19.5 19.5"
        stroke="currentColor"
        stroke-linecap="square"
      />
    </svg>
  );
};
