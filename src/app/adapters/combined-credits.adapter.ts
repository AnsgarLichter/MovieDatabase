import { Injectable } from "@angular/core";
import { Adapter } from "./base.adapter";
import { Cast, CombinedCredits, Crew } from "../models/actors.model";
import { TmdbCast, TmdbCombinedCredits, TmdbCrew } from "../models/tmdb/tmdb-actors.model";

@Injectable({
  providedIn: "root",
})
export class CombinedCreditsAdapter implements Adapter<CombinedCredits> {

  adapt(combinedCredits: TmdbCombinedCredits): CombinedCredits {
    console.log(combinedCredits);
    const cast = combinedCredits.cast.map((results) => (this.adaptCast(results))).sort((a, b) => +b.release_date - +a.release_date);
    const crew = combinedCredits.crew.map((results) => (this.adaptCrew(results))).sort((a, b) => +b.release_date - +a.release_date);
    return new CombinedCredits(
      cast,
      crew,
    );
  }

  adaptCast(cast: TmdbCast): Cast {
    return new Cast(
      cast.adult,
      cast.backdrop_path,
      cast.genre_ids,
      cast.id,
      cast.origin_country,
      cast.original_language,
      cast.original_name,
      cast.original_title,
      cast.overview,
      cast.popularity,
      cast.poster_path,
      new Date(cast.release_date),
      cast.title,
      cast.video,
      cast.vote_average,
      cast.vote_count,
      cast.character,
      cast.credit_id,
      cast.order,
      cast.media_type,
      cast.episode_count,
      new Date(cast.first_air_date)
      );
  }

  adaptCrew(crew: TmdbCrew): Crew {
    return new Crew(
      crew.id,
      crew.department,
      crew.original_language,
      crew.episode_count,
      crew.job,
      crew.overview,
      crew.origin_country,
      crew.original_name,
      crew.vote_count,
      new Date(crew.release_date),
      crew.name,
      crew.media_type,
      crew.popularity,
      crew.credit_id,
      crew.backdrop_path,
      crew.first_air_date,
      crew.vote_average,
      crew.genre_ids,
      crew.poster_path,
      crew.original_title,
      crew.video,
      crew.title,
      crew.adult,
    );
  }
}
