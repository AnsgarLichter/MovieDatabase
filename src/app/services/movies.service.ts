import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movieDto';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

private apiServerUrl = environment.movieDBApi;
private api_key = environment.THE_MOVIE_DATABASE_API_KEY;

  constructor(private httpClient: HttpClient) { }

  public getMovie(movieId: number): Observable<Movie>{
    return this.httpClient.get<Movie>(`${this.apiServerUrl}/3/movie/${movieId}?api_key=${this.api_key}`)
  }
}
