import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {MovieDbService} from './movie-db.service';
import {SearchMovie, SearchResults} from "../models/search-movie.model";
import {TmdbSearchMovie} from "../models/tmdb/tmdb-search-movie.model";
import {TmdbSearchResults} from "../models/tmdb/tdmb-search-result.model";
import {SearchResultsAdapter} from "../adapters/search-results.adapter";

@Injectable({
  providedIn: 'root'
})
export class SearchMovieService extends MovieDbService {
  private readonly PATH: string = '/search/movie/';

  private readonly PARAMETER_NAME_QUERY = 'query';
  private readonly PARAMETER_NAME_YEAR = 'year';
  private readonly PARAMETER_NAME_REGION = 'region';
  private readonly PARAMETER_NAME_PAGE = 'Page';

  constructor(protected override httpClient: HttpClient, private adapter: SearchResultsAdapter) {
    super(httpClient);
  }

  public searchMovies(query: string, year?: number, region?: string, page?: number): Observable<SearchResults<SearchMovie>> {
    const parameters = this.getBaseParameters();

    parameters[this.PARAMETER_NAME_QUERY] = query;
    if (!!year) {
      parameters[this.PARAMETER_NAME_YEAR] = year;
    }

    if (!!region) {
      parameters[this.PARAMETER_NAME_REGION] = region;
    }

    if (!!page) {
      parameters[this.PARAMETER_NAME_PAGE] = page;
    }

    const requestUrl = `${this.getBaselineUrl()}${this.PATH}`;
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
