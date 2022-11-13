import {Configuration} from './../models/configurationDto';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Movie} from '../models/movieDto';
import {MovieDbService} from './movieDb.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends MovieDbService {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  public getMovie(movieId: number, includeCredits: boolean, includeWatchProviders: boolean): Observable<Movie> {
    let requestUrl = `${this.getBaselineUrl()}/movie/${movieId}?${this.getQueryParameterForApiKey()}`;
    //TODO: URL has to be valid even if only 1 further request should be included
    if (includeCredits) {
      requestUrl += `&append_to_response=credits`;
    }

    if (includeWatchProviders) {
      requestUrl += `,watch/providers`
    }
    return this.httpClient.get<Movie>(requestUrl);
  }

}
