import { Configuration } from './../models/configurationDto';
import { ConfigurationService } from './../services/configuration.service';
import { Component, OnInit } from '@angular/core';
import {Movie, CrewMember, CastMember, WatchProvider} from '../models/movieDto';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public movie: Movie | undefined;
  public configuration: Configuration | undefined;

  constructor(private moviesService: MoviesService, private configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.getConfiguration();
    this.getMovie(76341);
  }

  getMovie(movieId: number): void {
    this.moviesService.getMovie(movieId, true, true).subscribe((movie: Movie) => {
      this.movie = movie;
    });
  }

  getConfiguration(): void {
    this.configurationService.getConfiguration().subscribe((configuration: Configuration) => {
      this.configuration = configuration;
    });
  }

  getConfigurationPath(): string {
    if(this.configuration?.images?.base_url && this.configuration?.images?.backdrop_sizes[0]) {
      return this.configuration?.images?.base_url + this.configuration?.images?.backdrop_sizes[0].toString()
    };

    return "";
  }

  getWatchProvidersToRentForCurrentCountry(): WatchProvider[] | undefined {
    const currentCountry = "DE";

    const watchProviders = this.movie?.["watch/providers"]?.results?.[currentCountry].rent;
    return watchProviders?.sort((a, b) =>
      a.display_priority - b.display_priority
    );
  }

  getWatchProvidersToBuyForCurrentCountry(): WatchProvider[] | undefined {
    const currentCountry = "DE";

    const watchProviders = this.movie?.["watch/providers"]?.results?.[currentCountry].buy;
    return watchProviders?.sort((a, b) =>
      a.display_priority - b.display_priority
    );
  }

  getWatchProvidersToFlatrateForCurrentCountry(): WatchProvider[] | undefined {
    const currentCountry = "DE";

    const watchProviders = this.movie?.["watch/providers"]?.results?.[currentCountry].flatrate;
    return watchProviders?.sort((a, b) =>
      a.display_priority - b.display_priority
    );
  }

}
