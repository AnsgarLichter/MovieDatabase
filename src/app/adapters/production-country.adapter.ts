import {Injectable} from "@angular/core";

import {Adapter} from "./base.adapter";

import {ProductionCompany} from "../models/movie.model";
import {TmdbProductionCompany} from "../models/tmdb/tmdb-movie.model";


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
