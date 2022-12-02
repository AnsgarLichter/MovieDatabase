import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TvShow} from '../models/tv-show.model';
import {TvShowAdapter} from "../adapters/tv-show.adapter";
import {TMDB_TvShow} from "../models/tmdb/tmdb-tv-show-model";

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

  constructor(private httpClient: HttpClient, private adapter: TvShowAdapter) {
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
}