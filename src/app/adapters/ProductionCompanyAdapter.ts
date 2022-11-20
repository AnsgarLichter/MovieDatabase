import {Injectable} from "@angular/core";
import {Adapter} from "./adapter";
import {ProductionCompany} from "../models/movieDto";
import {TmdbProductionCompany} from "../models/tmdbMovieDto";

@Injectable({
  providedIn: "root",
})
export class ProductionCompanyAdapter implements Adapter<ProductionCompany> {
  adapt(item: TmdbProductionCompany): ProductionCompany {
    return new ProductionCompany(
      item.id,
      item.name,
      item.origin_country,
      item.logo_path,
    );
  }
}
