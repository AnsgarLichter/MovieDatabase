import {Injectable} from "@angular/core";
import {Adapter} from "./adapter";
import {TmdbSearchMovie} from "../models/Tmdb/tmdbSearchMovieDto";
import {SearchMovie} from "../models/searchMovieDto";

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
