import {Injectable} from "@angular/core";

import {Adapter} from "./base.adapter";

import {tvShow_seasons} from "../models/tv-show.model";
import {ImageUrlProvider} from "../utilities/image-url-provider";
import {TMDB_tvShow_seasons} from "../models/tmdb/tmdb-tv-show-model";


@Injectable({
  providedIn: "root",
})
export class TvSeasonsAdapter implements Adapter<tvShow_seasons> {
  constructor(
    private imagePathProvider: ImageUrlProvider,
  ) {
  }

  adapt(item: TMDB_tvShow_seasons): tvShow_seasons {
    const posterPath = this.imagePathProvider.getPosterUrl(item.poster_path) || "assets/fallbackPictureMovie.png";

    return new tvShow_seasons(
      new Date(item.air_date),
      item.episode_count,
      item.id,
      item.name,
      item.overview,
      posterPath,
      item.season_number,
    );
  }
}
