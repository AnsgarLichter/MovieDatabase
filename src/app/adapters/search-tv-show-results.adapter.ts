import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";
import {SearchResults} from "../models/search-movie.model";
import {SearchTVShow} from "../models/search-tv-show.model";
import {SearchTVShowAdapter} from "./search-tv-show.adapter";
import {TmdbSearchResults} from "../models/tmdb/tdmb-search-result.model";
import {TmdbSearchTVShow} from "../models/tmdb/tmdb-search-tv-show.model";

@Injectable({
  providedIn: "root",
})
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
