import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";
import {TmdbSearchMovie} from "../models/tmdb/tmdb-search-movie.model";
import {SearchMovie} from "../models/search-movie.model";

@Injectable({
  providedIn: "root",
})
export class SearchMovieAdapter implements Adapter<SearchMovie> {
  adapt(item: TmdbSearchMovie): SearchMovie {
    return new SearchMovie(
      item.id,
      item.original_title,
      new Date(item.release_date),
      item.overview,
      item.poster_path
    );
  }
}
