import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";
import {TmdbSearchMovie} from "../models/tmdb/tmdb-search-movie.model";
import {SearchMovie} from "../models/search-movie.model";
import {ImageUrlProvider} from "../utilities/image-url-provider";

@Injectable({
  providedIn: "root",
})
export class SearchMovieAdapter implements Adapter<SearchMovie> {
  constructor(private imagePathProvider: ImageUrlProvider) {
  }

  adapt(item: TmdbSearchMovie): SearchMovie {
    let posterPath = this.imagePathProvider.getPosterUrl(item.poster_path);
    if (!posterPath || !item.poster_path) {
      posterPath = ""; //TODO: fallback path
    }

    return new SearchMovie(
      item.id,
      item.original_title,
      new Date(item.release_date),
      item.overview,
      posterPath
    );
  }
}
