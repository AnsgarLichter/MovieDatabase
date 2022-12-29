import { MovieDbService } from './movie-db.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SeriesTrendsAdapter } from '../adapters/trends-series.adapter';
import { TmdbSeriesTrends } from '../models/tmdb/tmdb-series-trends.model';

@Injectable({
  providedIn: 'root'
})
export class TrendsSeriesService extends MovieDbService {

  constructor(protected override httpClient: HttpClient, private adapter: SeriesTrendsAdapter){
    super(httpClient);
    this.adapter = adapter;
  }

  public getTrendsSeries(): Observable<TmdbSeriesTrends> {
    const requestUrl = `${this.getBaselineUrl()}/trending/tv/week`;
    const parameters = this.getBaseParameters();
    return this.httpClient.get<TmdbSeriesTrends>(requestUrl, {
      params: parameters,
    }).pipe(
      map((results: TmdbSeriesTrends) => {
        return this.adapter.adapt(results);
      })
    );
  }
}
