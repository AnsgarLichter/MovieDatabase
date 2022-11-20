import {Injectable} from "@angular/core";
import {Adapter} from "./adapter";
import {SpokenLanguage} from "../models/movieDto";
import {TmdbSpokenLanguage} from "../models/tmdbMovieDto";

@Injectable({
  providedIn: "root",
})
export class SpokenLanguageAdapter implements Adapter<SpokenLanguage> {
  adapt(item: TmdbSpokenLanguage): SpokenLanguage {
    return new SpokenLanguage(
      item.english_name,
      item.name,
      item.iso_639_1
    );
  }
}
