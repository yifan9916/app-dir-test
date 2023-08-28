import { NextResponse } from 'next/server';
import * as Omdb from '@/libs/omdb-api';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const seriesId = params.id;

  const seriesData = await Omdb.fetchSeriesById(seriesId);
  const seasonData = await Omdb.fetchSeasonEpisodes(1, seriesId);
  const { episodes } = await await Omdb.fetchAllEpisodeDetails(
    seasonData.Episodes
  );

  return NextResponse.json({ seriesData, seasonData, episodesData: episodes });
}
