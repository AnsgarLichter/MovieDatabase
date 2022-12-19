import { Injectable } from "@angular/core";
import { Adapter } from "./base.adapter";
import { Genre } from "../models/movie.model";
import { TmdbGenre } from "../models/tmdb/tmdb-movie.model";

@Injectable({
  providedIn: "root",
})
export class GenreAdapter implements Adapter<Genre> {
  adapt(item: TmdbGenre): Genre {
    return new Genre(
      item.id,
      item.name
    );
  }
}
