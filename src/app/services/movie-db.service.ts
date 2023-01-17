import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  private readonly API_URL: string = environment.movieDbApi;
  private readonly API_KEY: string | undefined = environment.movieDbApiKey;
  private readonly API_VERSION: string = environment.movieDbApiVersion;
  private readonly PARAMETER_NAME_API_KEY: string = 'api_key';
  protected readonly PARAMETER_NAME_APPEND_TO_RESPONSE: string = 'append_to_response';

  constructor(protected httpClient: HttpClient) {
  }

  protected getBaselineUrl(): String {
    return `${this.API_URL}/${this.API_VERSION}`
  }

  /**
   * Use 'getBaseParameters' instead.
   *
   * @protected
   * @deprecated
   */
  protected getQueryParameterForApiKey(): String {
    return `api_key=${this.API_KEY}`
  }

  protected getBaseParameters(): {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  } {
    const baseParameters: Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>> = {};

    baseParameters[this.PARAMETER_NAME_API_KEY] = this.API_KEY || "";

    return baseParameters;
  }
}
