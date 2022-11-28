import {Injectable} from "@angular/core";

import {Adapter} from "./base.adapter";

import {ProductionCountry} from "../models/movie.model";
import {TmdbProductionCountry} from "../models/tmdb/tmdb-movie.model";


@Injectable({
  providedIn: "root",
})
export class ProductionCountryAdapter implements Adapter<ProductionCountry> {
  adapt(item: TmdbProductionCountry): ProductionCountry {
    return new ProductionCountry(
      item.name,
      item.iso_3166_1,
    );
  }
}
