import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {TmdbMovie} from '../models/tmdb/tmdb-movie.model';
import {MovieDbService} from './movie-db.service';
import {MovieAdapter} from "../adapters/movie.adapter";
import {Movie} from "../models/movie.model";

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends MovieDbService {
  constructor(protected override httpClient: HttpClient, private adapter: MovieAdapter) {
    super(httpClient);

    this.adapter = adapter;
  }

  public getMovie(movieId: number, includeCredits: boolean, includeWatchProviders: boolean, includeKeywords: boolean): Observable<Movie> {
    const requestUrl = `${this.getBaselineUrl()}/movie/${movieId}}`;
    const parameters = this.getBaseParameters();

    const appendToResponse: string[] = [];
    if (includeCredits) {
      appendToResponse.push(`credits`);
    }

    if (includeWatchProviders) {
      appendToResponse.push(`watch/providers`);
    }

    if (includeKeywords) {
      appendToResponse.push(`keywords`);
    }

    if(appendToResponse.length) {
      parameters[`append_to_response`] = appendToResponse.join(`,`);
    }

    return this.httpClient.get<TmdbMovie>(
      requestUrl,
      {
        params: parameters
      }
    ).pipe(
      map((movie: TmdbMovie) => this.adapter.adapt(movie))
    );
  }

}
