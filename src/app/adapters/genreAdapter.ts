import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { Genre } from "../models/movieDto";
import { TmdbGenre } from "../models/Tmdb/tmdbMovieDto";

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
