import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import {CastMember} from "../models/movieDto";
import {TmdbCastMember} from "../models/Tmdb/tmdbMovieDto";

@Injectable({
  providedIn: "root",
})
export class CastAdapter implements Adapter<CastMember> {
  adapt(item: TmdbCastMember): CastMember {
    return new CastMember(
      item.id,
      item.cast_id,
      item.credit_id,
      item.original_name,
      item.name,
      item.gender,
      item.character,
      item.known_for_department,
      item.order,
      item.profile_path,
    );
  }
}
