import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";
import {CrewMember} from "../models/movie.model";
import {TmdbCrewMember} from "../models/tmdb/tmdb-movie.model";

@Injectable({
  providedIn: "root",
})
export class CrewAdapter implements Adapter<CrewMember> {

  adapt(item: TmdbCrewMember): CrewMember {
    const profilePath = item.gender === 1
      ? 'assets/fallbackProfilePictureWoman.svg'
      : 'assets/fallbackProfilePictureMan.svg'

    return new CrewMember(
      item.id,
      item.credit_id,
      item.original_name,
      item.name,
      item.gender,
      item.job,
      profilePath,
    );
  }
}
