import {Component, OnInit} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {Movie, WatchProvider} from '../models/movieDto';
import {Configuration} from '../models/configurationDto';
import {ConfigurationService} from '../services/configuration.service';

import {MoviesService} from '../services/movies.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovieDetailComponent implements OnInit {
  private routeParamsSubscription: any;

  public movie: Movie | undefined;
  public configuration: Configuration | undefined;

  constructor(
    private moviesService: MoviesService,
    private configurationService: ConfigurationService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.loadConfiguration();

    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.loadMovieDetails(+params['id']);
    });

    //this.getMovie(76341);
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  getImagePath(): string {
    if (!this.configuration?.images?.baseUrl || !this.configuration.images.backdropSizes.length) {
      return "";
    }

    return this.configuration?.images?.baseUrl + this.configuration?.images?.backdropSizes[2].toString()
  }

  getWatchProvidersForCurrentCountry(): WatchProvider[] | undefined {
    return this.movie?.watchProviders
      .filter(watchProvider => watchProvider.country === "DE") //TODO: Determine current country dynamically
      .sort((a: WatchProvider, b: WatchProvider) =>
        a.displayPriority - b.displayPriority
      );
  }

  private loadMovieDetails(movieId: number): void {
    this.moviesService.getMovie(movieId, true, true, true).subscribe((movie: Movie) => {
      this.movie = movie;
    });
  }

  private loadConfiguration(): void {
    this.configurationService.getConfiguration().subscribe((configuration: Configuration) => {
      this.configuration = configuration;
    });
  }
}
