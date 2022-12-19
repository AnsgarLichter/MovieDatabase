import {Injectable} from "@angular/core";

import {Adapter} from "./base.adapter";
import {SearchMovieAdapter} from "./search-movie.adapter";

import {SearchMovie, SearchResults} from "../models/search-movie.model";
import {TmdbSearchResults} from "../models/tmdb/tdmb-search-result.model";
import {TmdbSearchMovie} from "../models/tmdb/tmdb-search-movie.model";
import {SearchTVShow} from "../models/search-tv-show.model";
import {SearchTVShowAdapter} from "./search-tv-show.adapter";
import {TmdbSearchTVShow} from "../models/tmdb/tmdb-search-tv-show.model";


@Injectable({
  providedIn: "root",
})
export class SearchResultsAdapter implements Adapter<SearchResults<SearchMovie>> {
  constructor(private searchMovieAdapter: SearchMovieAdapter) {
  }

  adapt(item: TmdbSearchResults<TmdbSearchMovie>): SearchResults<SearchMovie> {
    const adaptedResults: SearchMovie[] = [];
    item.results.forEach((result: TmdbSearchMovie) => adaptedResults.push(this.searchMovieAdapter.adapt(result)));

    return new SearchResults<SearchMovie>(
      item.page,
      adaptedResults,
      item.total_pages
    )
  }
}

export class SearchTVShowResultsAdapter implements Adapter<SearchResults<SearchTVShow>> {
  constructor(private searchTVShowAdapter: SearchTVShowAdapter) {
  }

  adapt(item: TmdbSearchResults<TmdbSearchTVShow>): SearchResults<SearchTVShow> {
    const adaptedResults: SearchTVShow[] = [];
    item.results.forEach((result: TmdbSearchTVShow) => adaptedResults.push(this.searchTVShowAdapter.adapt(result)));

    return new SearchResults<SearchTVShow>(
      item.page,
      adaptedResults,
      item.total_pages
    )
  }
}
