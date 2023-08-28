import '../styles/globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

type Props = {
  children: React.ReactNode;
  panel: React.ReactNode;
};

const helveticaNeue = localFont({
  src: [
    {
      path: '../fonts/HelveticaNeueLTStd-Roman.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueLTStd-Lt.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueLTStd-Md.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueLTStd-Bd.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'OMDB API',
  description: 'OMDB API Playground',
};

export default function RootLayout(props: Props) {
  const { children, panel } = props;

  return (
    <html lang="en">
      <body className={`${helveticaNeue.className} flex`}>
        {children}
        {panel}
      </body>
    </html>
  );
}
