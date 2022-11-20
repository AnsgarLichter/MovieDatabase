import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";

import {TmdbBelongsToCollection} from "../models/Tmdb/tmdbMovieDto";
import {BelongsToCollection} from "../models/movieDto";

@Injectable({
  providedIn: "root",
})
export class BelongsToCollectionAdapter implements Adapter<BelongsToCollection> {
  adapt(item: TmdbBelongsToCollection): BelongsToCollection {
    return new BelongsToCollection(
      item.id,
      item.name,
      item.poster_path,
      item.backdrop_path
    );
  }
}
