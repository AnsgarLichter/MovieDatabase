import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";

import {TmdbBelongsToCollection} from "../models/tmdb/tmdb-movie.model";
import {BelongsToCollection} from "../models/movie.model";
import {Configuration} from "../models/configuration.model";
import {ImagePathProvider} from "../utilities/image-path-provider";

@Injectable({
  providedIn: "root",
})
export class BelongsToCollectionAdapter implements Adapter<BelongsToCollection> {
  constructor(private imagePathProvider: ImagePathProvider) {
  }

  adapt(item: TmdbBelongsToCollection): BelongsToCollection {
    const posterPath = this.imagePathProvider.getPosterUrl(item.poster_path) || ""; //TODO: Fallback picture
    const backdropPath = this.imagePathProvider.getBackdropUrl(item.backdrop_path) || ""; //TODO: Fallback picture

    return new BelongsToCollection(
      item.id,
      item.name,
      posterPath,
      backdropPath
    );
  }
}
