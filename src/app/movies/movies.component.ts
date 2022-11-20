import {Component, OnInit} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import {Movie, WatchProvider} from '../models/movieDto';
import {Configuration} from '../models/configurationDto';
import {ConfigurationService} from '../services/configuration.service';

import {MoviesService} from '../services/movies.service';



@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MoviesComponent implements OnInit {

  public movie: Movie | undefined;
  public configuration: Configuration | undefined;

  constructor(private moviesService: MoviesService, private configurationService: ConfigurationService) {
  }

  ngOnInit(): void {
    this.getConfiguration();
    this.getMovie(76341);
  }

  getMovie(movieId: number): void {
    this.moviesService.getMovie(movieId, true, true, true).subscribe((movie: Movie) => {
      this.movie = movie;
    });
  }

  getConfiguration(): void {
    this.configurationService.getConfiguration().subscribe((configuration: Configuration) => {
      this.configuration = configuration;
    });
  }

  getConfigurationPath(): string {
    if (this.configuration?.images?.baseUrl && this.configuration?.images?.backdropSizes[2]) {
      return this.configuration?.images?.baseUrl + this.configuration?.images?.backdropSizes[2].toString()
    }

    return "";
  }

  getWatchProvidersForCurrentCountry(): WatchProvider[] | undefined {
    return this.movie?.watchProviders
      .filter(watchProvider => watchProvider.country === "DE") //TODO: Determine current country dynamically
      .sort((a: WatchProvider, b: WatchProvider) =>
        a.displayPriority - b.displayPriority
      );
  }

}
