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
    const posterPath = this.imagePathProvider.getPosterUrl(item.poster_path) || "assets/fallbackPictureMovie.png";
    const releaseDate = new Date(item.release_date);

    return new SearchMovie(
      item.id,
      item.original_title,
      item.overview,
      posterPath,
      isFinite(releaseDate.getTime()) ? releaseDate : undefined
    );
  }
}
