import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";
import {Keyword} from "../models/movie.model";
import {TmdbKeyword} from "../models/tmdb/tmdb-movie.model";

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
