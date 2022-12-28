import { Injectable } from "@angular/core";
import { Adapter } from "./base.adapter";
import { Actors, Cast, CombinedCredits, Crew } from "../models/actors.model";
import { TmdbActors, TmdbCast, TmdbCombinedCredits, TmdbCrew } from "../models/tmdb/tmdb-actors.model";
import { ImageUrlProvider } from "../utilities/image-url-provider";
import { CombinedCreditsAdapter } from "./combined-credits.adapter";

@Injectable({
  providedIn: "root",
})
export class ActorsAdapter implements Adapter<Actors> {

  constructor(private imagePathProvider: ImageUrlProvider, private combinedCreditsAdapter: CombinedCreditsAdapter){}
  
  adapt(item: TmdbActors): Actors {
    //console.log("combined_credits", item?.combined_credits);
    const combinedCredits = this.combinedCreditsAdapter.adapt(item?.combined_credits);
    //console.log("Test combined: ", combinedCredits);
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
      this.imagePathProvider.getProfileUrl(item?.profile_path),
      combinedCredits
    );
  }

  /*adaptCombinedCredits(combinedCredits: TmdbCombinedCredits): CombinedCredits {
    return new CombinedCredits(
      this.adaptCast(combinedCredits.cast),
      this.adaptCrew(combinedCredits.crew),
      combinedCredits.id
    );
  }

  adaptCast(cast: TmdbCast): Cast {
    console.log("Cast", cast);
    return new Cast(
      cast.adult,
      cast.backdrop_path,
      cast.genre_ids,
      cast.id,
      cast.original_language,
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
      cast.media_Type
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
  }*/

  checkDate(date: string): Date | null{
    if(date === null){
      return null;
    }

    return new Date(date);
  }
}
