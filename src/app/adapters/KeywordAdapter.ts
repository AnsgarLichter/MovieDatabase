import {Injectable} from "@angular/core";
import {Adapter} from "./adapter";
import {Keyword} from "../models/movieDto";
import {TmdbKeyword} from "../models/tmdbMovieDto";

@Injectable({
  providedIn: "root",
})
export class KeywordAdapter implements Adapter<Keyword> {
  adapt(item: TmdbKeyword): Keyword {
    return new Keyword(
      item.id,
      item.name
    );
  }
}
