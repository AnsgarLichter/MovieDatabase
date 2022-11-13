import { MovieDbService } from './movieDb.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieTrends, SeriesTrends } from '../models/trendsDto';

@Injectable({
  providedIn: 'root'
})
export class TrendsService extends MovieDbService {

  public getTrendsMovies(): Observable<MovieTrends> {
    return this.httpClient.get<MovieTrends>(`${this.getBaselineUrl()}/trending/movie/week?${this.getQueryParameterForApiKey()}`);
  }

  public getTrendsSeries(): Observable<SeriesTrends> {
    return this.httpClient.get<SeriesTrends>(`${this.getBaselineUrl()}/trending/tv/week?${this.getQueryParameterForApiKey()}`);
  }

}
