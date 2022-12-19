import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  private apiServerUrl = environment.movieDbApi;
  private apiKey = environment.movieDbApiKey;
  private apiVersion = environment.movieDbApiVersion;

  constructor(protected httpClient: HttpClient) {
  }

  protected getBaselineUrl(): String {
    return `${this.apiServerUrl}/${this.apiVersion}`
  }

  protected getQueryParameterForApiKey(): String {
    return `api_key=${this.apiKey}`
  }

  protected getBaseParameters(): {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  } {
    return {
      "api_key": this.apiKey || ""
    }
  }
}
