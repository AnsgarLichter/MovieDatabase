import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TvShow } from '../models/tv-show.model';

@Injectable({
  providedIn: 'root'
})
export class TVShowService {

private apiServerUrl = environment.movieDbApi;
private api_key = environment.movieDbApiKey;

  constructor(private httpClient: HttpClient) { }

  public getTVShow(tvShowID: number): Observable<TvShow>{
    return this.httpClient.get<TvShow>(`${this.apiServerUrl}/3/tv/${tvShowID}?api_key=${this.api_key}`)
  }
}
