import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";
import {TmdbSearchTVShow} from "../models/tmdb/tmdb-search-tv-show.model";
import {SearchTVShow} from "../models/search-tv-show.model";
import {ImageUrlProvider} from "../utilities/image-url-provider";

@Injectable({
  providedIn: "root",
})
export class SearchTVShowAdapter implements Adapter<SearchTVShow> {
  constructor(private imagePathProvider: ImageUrlProvider) {
  }

  adapt(item: TmdbSearchTVShow): SearchTVShow {
    const posterPath = this.imagePathProvider.getPosterUrl(item.poster_path) || "assets/fallbackPictureMovie.png";

    return new SearchTVShow(
      item.id,
      item.original_name,
      item.overview,
      posterPath,
      new Date(item.first_air_date)
    );
  }
}
