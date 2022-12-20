import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TvShow} from '../models/tv-show.model';
import {TvShowAdapter} from "../adapters/tv-show.adapter";
import {TMDB_TvShow} from "../models/tmdb/tmdb-tv-show-model";
import {SearchResults} from "../models/search-movie.model";
import {SearchTVShow} from "../models/search-tv-show.model";
import {TmdbSearchResults} from "../models/tmdb/tdmb-search-result.model";
import {TmdbSearchTVShow} from "../models/tmdb/tmdb-search-tv-show.model";
import {SearchTVShowResultsAdapter} from "../adapters/search-tv-show-results.adapter";

@Injectable({
  providedIn: 'root'
})
export class TVShowService {
  private apiServerUrl = environment.movieDbApi;
  private apiKey = environment.movieDbApiKey;
  private apiVersion = environment.movieDbApiVersion;

  protected getBaselineUrl(): string {
    return `${this.apiServerUrl}/${this.apiVersion}`
  }

  protected getQueryParameterForApiKey(): string {
    return `api_key=${this.apiKey}`
  }

  constructor(protected httpClient: HttpClient, private adapter: TvShowAdapter, private searchAdapter: SearchTVShowResultsAdapter) {
    this.adapter = adapter;
  }

  public getTVShow(tvShowID: number): Observable<TvShow> {
    let requestUrl = `${this.getBaselineUrl()}/tv/${tvShowID}?${this.getQueryParameterForApiKey()}`;

    const appendToResponse: string[] = ["&append_to_response="];
    appendToResponse.push(`credits`);
    appendToResponse.push(`watch/providers`);
    appendToResponse.push(`keywords`);

    let parameters = appendToResponse.join(",")

    console.log(requestUrl + parameters)

    return this.httpClient.get<TMDB_TvShow>(requestUrl + parameters).pipe(
      map((tvShow: TMDB_TvShow) => this.adapter.adapt(tvShow))
    );
  }

  public searchTVShows(query: string, year?: number, region?: string, page?: number): Observable<SearchResults<SearchTVShow>> {
    let requestUrl = `${this.getBaselineUrl()}/search/tv?${this.getQueryParameterForApiKey()}`;

    const appendToResponse: string[] = ["&"];
    appendToResponse.push(`query=`+query);

    if (!!year) {
      appendToResponse.push(`first_air_date_year=`+year);
    }

    if (!!page) {
      appendToResponse.push(`page=`+page);
    }

    let parameters = appendToResponse.join(",&")

    return this.httpClient.get<TmdbSearchResults<TmdbSearchTVShow>>(requestUrl + parameters).pipe(
      map(results => this.searchAdapter.adapt(results))
    );
  }
}
