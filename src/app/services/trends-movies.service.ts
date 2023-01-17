import { MovieDbService } from './movie-db.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TmdbMovieTrends } from '../models/tmdb/tmdb-movies-trends.model';
import { MovieTrendsAdapter } from '../adapters/trends-movies.adapter';

@Injectable({
  providedIn: 'root'
})
export class TrendsMovieService extends MovieDbService {

  constructor(protected override httpClient: HttpClient, private adapter: MovieTrendsAdapter){
    super(httpClient);
    this.adapter = adapter;
  }

  public getTrendsMovies(): Observable<TmdbMovieTrends> {
    const requestUrl = `${this.getBaselineUrl()}/trending/movie/week`;
    const parameters = this.getBaseParameters();
    return this.httpClient.get<TmdbMovieTrends>(requestUrl, {
      params: parameters,
    }).pipe(
      map((results: TmdbMovieTrends) => {
        return this.adapter.adapt(results);
      })
    );
  }
}
