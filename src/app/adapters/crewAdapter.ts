import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import {CrewMember} from "../models/movieDto";
import {TmdbCrewMember} from "../models/Tmdb/tmdbMovieDto";

@Injectable({
  providedIn: "root",
})
export class CrewAdapter implements Adapter<CrewMember> {
  adapt(item: TmdbCrewMember): CrewMember {
    return new CrewMember(
      item.id,
      item.credit_id,
      item.original_name,
      item.name,
      item.gender,
      item.adult,
      item.department,
      item.job,
      item.known_for_department,
    );
  }
}
