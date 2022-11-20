import {Injectable} from "@angular/core";
import {Adapter} from "./adapter";
import {ProductionCountry} from "../models/movieDto";
import {TmdbProductionCountry} from "../models/Tmdb/tmdbMovieDto";

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
