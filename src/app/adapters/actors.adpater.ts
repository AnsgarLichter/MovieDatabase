import { Injectable } from "@angular/core";
import { Adapter } from "./base.adapter";
import { Actors } from "../models/actors.model";
import { TmdbActors } from "../models/tmdb/tmdb-actors.model";

@Injectable({
  providedIn: "root",
})
export class ActorsAdapter implements Adapter<Actors> {


  adapt(item: TmdbActors): Actors {
    return new Actors(
      item?.adult,
      item?.also_known_as,
      item?.biography,
      this.checkDate(item?.birthday),
      this.checkDate(item?.deathday),
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

  checkDate(date: string): Date | null{
    if(date === null){
      return null;
    }

    return new Date(date);
  }
}
