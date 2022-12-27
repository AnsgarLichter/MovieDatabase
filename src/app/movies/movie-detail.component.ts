import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {Movie, WatchProvider} from '../models/movie.model';

import {MoviesService} from '../services/movies.service';
import {FormControl, FormGroup} from "@angular/forms";
import {getCurrentCountryCodeByNavigatorLanguage} from "../utilities/functions";


@Component({
  selector: 'app-movies',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  public movie: Movie | undefined;
  public watchProvidersInCurrentCountry: WatchProvider[] | undefined;
  public countryForm: FormGroup;

  private routeParamsSubscription: any;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
  ) {
    const region = getCurrentCountryCodeByNavigatorLanguage();

    this.countryForm = new FormGroup({
      region: new FormControl(region),
    });
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.loadMovieDetails(+params['id']);
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  onCountrySelectionChanged(): void {
    this.updateWatchProviders();
  }

  private updateWatchProviders(): void {
    const selectedCountryCode = this.countryForm.value.region;
    if (!selectedCountryCode) {
      return;
    }

    this.watchProvidersInCurrentCountry = this.movie?.watchProviders
      .filter(watchProvider => watchProvider.country === selectedCountryCode)
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
