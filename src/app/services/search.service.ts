import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {MovieDbService} from './movie-db.service';
import {SearchMovie, SearchResults} from "../models/search-movie.model";
import {TmdbSearchMovie, TmdbSearchMovieResults} from "../models/tmdb/tmdb-search-movie.model";
import {SearchMovieAdapter} from "../adapters/search-movie.adapter";
import {TmdbSearchResults} from "../models/tmdb/tdmb-search-result.model";
import {SearchResultsAdapter} from "../adapters/search-results.adapter";

@Injectable({
  providedIn: 'root'
})
export class SearchService extends MovieDbService {
  constructor(protected override httpClient: HttpClient, private adapter: SearchResultsAdapter) {
    super(httpClient);
  }

  public searchMovies(query: string, year?: number, region?: string, page?: number): Observable<SearchResults<SearchMovie>> {
    const parameters = this.getBaseParameters();

    parameters["query"] = query;
    if (!!year) {
      parameters["year"] = year;
    }

    if (!!region) {
      parameters["region"] = region;
    }

    if (!!page) {
      parameters["page"] = page;
    }

    const requestUrl = `${this.getBaselineUrl()}/search/movie/`;
    return this.httpClient.get<TmdbSearchResults<TmdbSearchMovie>>(
      requestUrl,
      {
        params: parameters
      }
    )
      .pipe(
        map(results => this.adapter.adapt(results))
      );
  }

}
