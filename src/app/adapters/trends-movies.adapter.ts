import { Injectable } from '@angular/core';
import { Adapter } from './base.adapter';
import {
  TmdbMovieTrends,
  TmdbResultsMovie,
} from '../models/tmdb/tmdb-movies-trends.model';
import { MovieTrends, ResultsMovie } from '../models/trends-movies.model';
import { ImageUrlProvider } from '../utilities/image-url-provider';

@Injectable({
  providedIn: 'root',
})
export class MovieTrendsAdapter implements Adapter<MovieTrends> {
  constructor(private imagePathProvider: ImageUrlProvider) {}

  adapt(item: TmdbMovieTrends): MovieTrends {
    const movieTrends: ResultsMovie[] = [];
    item.results.forEach((results) =>
      movieTrends.push(this.adaptMovies(results))
    );
    return new MovieTrends(item.page, movieTrends);
  }

  adaptMovies(tmdbMovies: TmdbResultsMovie): ResultsMovie {
    const backdropPath =
      this.imagePathProvider.getBackdropUrl(tmdbMovies.backdrop_path) ||
      'assets/fallbackPictureMovie.png';
    const posterPath =
      this.imagePathProvider.getPosterUrl(tmdbMovies.poster_path) ||
      'assets/fallbackPictureMovie.png';

    return new ResultsMovie(
      tmdbMovies.adult,
      backdropPath,
      tmdbMovies.id,
      tmdbMovies.title,
      tmdbMovies.original_language,
      tmdbMovies.original_title,
      tmdbMovies.overview,
      posterPath,
      tmdbMovies.media_type,
      tmdbMovies.genre_ids,
      tmdbMovies.popularity,
      new Date(tmdbMovies.release_date).toLocaleDateString(),
      tmdbMovies.video,
      tmdbMovies.vote_average,
      tmdbMovies.vote_count
    );
  }
}
