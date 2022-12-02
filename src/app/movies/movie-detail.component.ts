import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

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
  public watchProvidersInCurrentCountry: WatchProvider[] | undefined;
  public selectedCountryCode: string = "";

  private routeParamsSubscription: any;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.determineCurrentCountryCodeByNavigatorLanguage();

    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.loadMovieDetails(+params['id']);
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  onCountrySelectionChanged(event: MatSelectChange): void {
    this.selectedCountryCode = event.value;
    this.updateWatchProviders();
  }

  private determineCurrentCountryCodeByNavigatorLanguage(): void {
    const regex = /^(?:(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))$|^((?:[a-z]{2,3}(?:(?:-[a-z]{3}){1,3})?)|[a-z]{4}|[a-z]{5,8})(?:-([a-z]{4}))?(?:-([a-z]{2}|\d{3}))?((?:-(?:[\da-z]{5,8}|\d[\da-z]{3}))*)?((?:-[\da-wy-z](?:-[\da-z]{2,8})+)*)?(-x(?:-[\da-z]{1,8})+)?$|^(x(?:-[\da-z]{1,8})+)$/i;

    const result = regex.exec(navigator.language);
    if (!result || !result.length || !result[5]) {
      return;
    }

    this.selectedCountryCode = result[5];
  }

  private updateWatchProviders(): void {
    if (!this.selectedCountryCode) {
      return;
    }

    this.watchProvidersInCurrentCountry = this.movie?.watchProviders
      .filter(watchProvider => watchProvider.country === this.selectedCountryCode)
      .sort((a: WatchProvider, b: WatchProvider) =>
        a.displayPriority - b.displayPriority
      );
  }

  private loadMovieDetails(movieId: number): void {
    this.moviesService.getMovie(movieId, true, true, true)
      .subscribe((movie: Movie) => {
        this.movie = movie;
        this.updateWatchProviders();
      });
  }
}
