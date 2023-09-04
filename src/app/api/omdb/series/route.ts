import { NextResponse } from 'next/server';

const apiKey = process.env.OMDB_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&type=series&s=${search}`,
  );

  if (!res.ok) {
    throw new Error();
  }

  const data = await res.json();

  return NextResponse.json(data.Search);
}
