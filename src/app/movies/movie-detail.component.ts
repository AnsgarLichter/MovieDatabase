import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Movie, WatchProvider } from '../models/movie.model';

import { MoviesService } from '../services/movies.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovieDetailComponent implements OnInit {
  public movie: Movie | undefined;

  private routeParamsSubscription: any;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.loadMovieDetails(+params['id']);
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  getWatchProvidersForCurrentCountry(): WatchProvider[] | undefined {
    return this.movie?.watchProviders
      .filter(watchProvider => watchProvider.country === "DE") //TODO: Determine current country dynamically
      .sort((a: WatchProvider, b: WatchProvider) =>
        a.displayPriority - b.displayPriority
      );
  }

  private loadMovieDetails(movieId: number): void {
    this.moviesService.getMovie(movieId, true, true, true)
      .subscribe((movie: Movie) => {
        this.movie = movie;
      });
  }
}
