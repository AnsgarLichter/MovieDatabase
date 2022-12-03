import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";

import {TmdbBelongsToCollection} from "../models/tmdb/tmdb-movie.model";
import {BelongsToCollection} from "../models/movie.model";
import {ImageUrlProvider} from "../utilities/image-url-provider";

@Injectable({
  providedIn: "root",
})
export class BelongsToCollectionAdapter implements Adapter<BelongsToCollection> {
  constructor(private imagePathProvider: ImageUrlProvider) {
  }

  adapt(item: TmdbBelongsToCollection): BelongsToCollection {
    const posterPath = this.imagePathProvider.getPosterUrl(item.poster_path) || "assets/fallbackPictureMovie.png";
    const backdropPath = this.imagePathProvider.getBackdropUrl(item.backdrop_path) || "assets/fallbackPictureMovie.png";

    return new BelongsToCollection(
      item.id,
      item.name,
      posterPath,
      backdropPath
    );
  }
}
