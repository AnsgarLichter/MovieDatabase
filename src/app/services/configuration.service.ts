import {Configuration} from './../models/configurationDto';

;
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MovieDbService} from './movieDb.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends MovieDbService {

  private configuration: Configuration | undefined;

  public getConfiguration(): Observable<Configuration> {
    if (this.configuration) {
      return of(this.configuration);
    }

    const observable = this.httpClient.get<Configuration>(
      `${this.getBaselineUrl()}/configuration?${this.getQueryParameterForApiKey()}`
    );
    observable.subscribe((configuration: Configuration) => {
      this.configuration = configuration;
    });

    return observable
  }
}
