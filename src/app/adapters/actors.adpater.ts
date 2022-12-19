import { Injectable } from "@angular/core";
import { Adapter } from "./base.adapter";
import { ActorsSearch, KnownFor } from "../models/search-actors.model";
import { TmdbActorsSearch, TmdbSearchActorsResult } from "../models/tmdb/tmdb-search-actors.model";
import { TmdbSearchResults } from "../models/tmdb/tdmb-search-result.model";
import { TmdbSearchSimpleResult } from "../models/tmdb/tmdb-search-simple-result.model";
import { Actors } from "../models/actors.model";
import { TmdbActors } from "../models/tmdb/tmdb-actors.model";

@Injectable({
  providedIn: "root",
})
export class ActorsAdapter implements Adapter<Actors> {


  adapt(item: TmdbActors): Actors {
    let actor: TmdbActors | undefined;
    
    //console.log(item);
    //const test = item.results.map((item) => actors = item);
    //const actors = item?.results?.map((item) => actor = item);

    return new Actors(
      item?.adult,
      item?.also_known_as,
      item?.biography,
      item?.birthday,
      item?.deathday,
      item?.gender,
      item?.homepage,
      item?.id,
      item?.imdb_id,
      item?.known_for_department,
      item?.name,
      item?.place_of_birth,
      item?.popularity,
      item?.profile_path
    );
  }
}
