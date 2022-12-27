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
  private readonly PATH: string = '/movie/{movie_id}'
  private readonly SUB_PATH_CREDITS: string = 'credits';
  private readonly SUB_PATH_WATCH_PROVIDERS: string = 'watch/providers';
  private readonly SUB_PATH_KEYWORDS: string = 'keywords';

  constructor(protected override httpClient: HttpClient, private adapter: MovieAdapter) {
    super(httpClient);

    this.adapter = adapter;
  }

  public getMovie(movieId: number, includeCredits: boolean, includeWatchProviders: boolean, includeKeywords: boolean): Observable<Movie> {
    const requestUrl = `${this.getBaselineUrl()}${this.PATH.replace('{movie_id}', String(movieId))}`;
    const parameters = this.getBaseParameters();

    const appendToResponse: string[] = [];
    if (includeCredits) {
      appendToResponse.push(this.SUB_PATH_CREDITS);
    }

    if (includeWatchProviders) {
      appendToResponse.push(this.SUB_PATH_WATCH_PROVIDERS);
    }

    if (includeKeywords) {
      appendToResponse.push(this.SUB_PATH_KEYWORDS);
    }

    if (appendToResponse.length) {
      parameters[this.PARAMETER_NAME_APPEND_TO_RESPONSE] = appendToResponse.join(`,`);
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
