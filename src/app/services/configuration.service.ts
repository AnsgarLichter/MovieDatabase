import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {MovieDbService} from './movie-db.service';
import {TmdbConfiguration} from "../models/tmdb/tmdb-configuration.model";
import {TmdbMovie} from "../models/tmdb/tmdb-movie.model";
import {HttpClient} from "@angular/common/http";
import {Configuration} from "../models/configuration.model";
import {ConfigurationAdapter} from "../adapters/configuration.adapter";

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
