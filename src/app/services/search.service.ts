import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {MovieDbService} from './movieDb.service';
import {SearchMovie} from "../models/searchMovieDto";
import {TmdbSearchMovie, TmdbSearchMovieResults} from "../models/Tmdb/tmdbSearchMovieDto";
import {SearchMovieAdapter} from "../adapters/searchMovieAdapter";

@Injectable({
  providedIn: 'root'
})
export class SearchService extends MovieDbService {
  constructor(protected override httpClient: HttpClient, private adapter: SearchMovieAdapter) {
    super(httpClient);

    this.adapter = adapter;
  }

  public searchMovies(query: string): Observable<SearchMovie[]> { //TODO: Add optional parameters from API description
    const encodedQuery = query; //TODO

    let requestUrl = `${this.getBaselineUrl()}/search/movie/?${this.getQueryParameterForApiKey()}`;

    requestUrl += `&query=${encodedQuery}`;

    return this.httpClient.get<TmdbSearchMovieResults>(requestUrl).pipe(
      map(this.mapSearchMovieResults.bind(this))
    );
  }

  private mapSearchMovieResults(results: TmdbSearchMovieResults): SearchMovie[] {
    const foundMovies: TmdbSearchMovie[] = results.results;
    const adaptedMovies: SearchMovie[] = [];

    foundMovies.forEach((item: TmdbSearchMovie) => adaptedMovies.push(this.adapter.adapt(item)));

    return adaptedMovies;
  }

}
