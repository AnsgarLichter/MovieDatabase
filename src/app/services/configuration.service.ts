import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {MovieDbService} from './movieDb.service';
import {TmdbConfiguration} from "../models/Tmdb/tmdbConfiguration";
import {TmdbMovie} from "../models/Tmdb/tmdbMovieDto";
import {HttpClient} from "@angular/common/http";
import {Configuration} from "../models/configurationDto";
import {ConfigurationAdapter} from "../adapters/configurationAdapter";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends MovieDbService {

  private configuration: Configuration | undefined;

  constructor(protected override httpClient: HttpClient, private adapter: ConfigurationAdapter) {
    super(httpClient);
  }

  public getConfiguration(): Observable<Configuration> {
    if (this.configuration) {
      return of(this.configuration);
    }

    const observable = this.httpClient.get<TmdbConfiguration>(
      `${this.getBaselineUrl()}/configuration?${this.getQueryParameterForApiKey()}`
    ).pipe(
      map((configuration: TmdbConfiguration) => this.adapter.adapt(configuration))
    );

    observable.subscribe((configuration: Configuration) => {
      this.configuration = configuration;
    });

    return observable
  }
}
