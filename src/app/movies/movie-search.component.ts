import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from "@angular/router";

import {SearchService} from "../services/search.service";

import {SearchMovie} from "../models/search-movie.model";
import {Configuration} from "../models/configuration.model";
import {ConfigurationService} from "../services/configuration.service";

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  private routeParamsSubscription: any;

  public query: string | null | undefined;
  public configuration: Configuration | undefined;
  public movies: SearchMovie[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private configurationService: ConfigurationService,
  ) {
  }

  ngOnInit(): void {
    this.loadConfiguration();

    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.query = params['query'];
      this.loadSearchResultsByQuery();
    });
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

  private loadSearchResultsByQuery(): void {
    if (!this.query) {
      return;
    }

    this.searchService.searchMovies(this.query)
      .subscribe((movies: SearchMovie[]) => {
        this.movies = movies;
      });
  }

  private loadConfiguration(): void {
    this.configurationService.getConfiguration().subscribe((configuration: Configuration) => {
      this.configuration = configuration;
    });
  }

}
