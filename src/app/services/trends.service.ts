import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieTrends, SeriesTrends } from '../models/trendsDto';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {

  private apiServerUrl = environment.movieDBApi;
  private api_key = environment.THE_MOVIE_DATABASE_API_KEY;

  //ToDo: Sort the Trends by his popularity
  constructor(private httpClient: HttpClient) { }

  public getTrendsMovies(): Observable<MovieTrends>{
    return this.httpClient.get<MovieTrends>(`${this.apiServerUrl}/3/trending/movie/week?api_key=${this.api_key}`);
  }

  public getTrendsSeries(): Observable<SeriesTrends>{
    return this.httpClient.get<SeriesTrends>(`${this.apiServerUrl}/3/trending/tv/week?api_key=${this.api_key}`);
  }
}
