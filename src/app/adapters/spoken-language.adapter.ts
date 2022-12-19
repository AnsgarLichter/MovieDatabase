import {Injectable} from "@angular/core";

import {Adapter} from "./base.adapter";

import {SpokenLanguage} from "../models/movie.model";
import {TmdbSpokenLanguage} from "../models/tmdb/tmdb-movie.model";


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
