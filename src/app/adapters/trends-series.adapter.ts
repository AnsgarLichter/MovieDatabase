import { Injectable } from '@angular/core';
import { Adapter } from './base.adapter';
import { ImageUrlProvider } from '../utilities/image-url-provider';
import { ResultsSeries, SeriesTrends } from '../models/trends-series.model';
import { TmdbResultsSeries, TmdbSeriesTrends } from '../models/tmdb/tmdb-series-trends.model';

@Injectable({
  providedIn: 'root',
})
export class SeriesTrendsAdapter implements Adapter<SeriesTrends> {
  constructor(private imagePathProvider: ImageUrlProvider) {}

  adapt(item: TmdbSeriesTrends): SeriesTrends {
    const movieTrends: ResultsSeries[] = [];
    item.results.forEach((results) =>
      movieTrends.push(this.adaptMovies(results))
    );
    return new SeriesTrends(item.page, movieTrends);
  }

  adaptMovies(tmdbMovies: TmdbResultsSeries): ResultsSeries {
    const backdropPath =
      this.imagePathProvider.getBackdropUrl(tmdbMovies.backdrop_path) ||
      'assets/fallbackPictureMovie.png';
    const posterPath =
      this.imagePathProvider.getPosterUrl(tmdbMovies.poster_path) ||
      'assets/fallbackPictureMovie.png';

    return new ResultsSeries(
      tmdbMovies.adult,
      backdropPath,
      tmdbMovies.id,
      tmdbMovies.name,
      tmdbMovies.original_language,
      tmdbMovies.original_title,
      tmdbMovies.overview,
      posterPath,
      tmdbMovies.media_type,
      tmdbMovies.genre_ids,
      tmdbMovies.popularity,
      new Date(tmdbMovies.first_air_date).toLocaleDateString(),
      tmdbMovies.vote_average,
      tmdbMovies.vote_count,
      tmdbMovies.origin_country
    );
  }
}
