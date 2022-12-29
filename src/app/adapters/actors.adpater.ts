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
    const combinedCredits = this.combinedCreditsAdapter.adapt(item?.combined_credits);
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
      this.imagePathProvider.getProfileUrl(item?.profile_path) || "assets/fallbackPictureMovie.png",
      combinedCredits
    );
  }
  
  checkDate(date: string): Date | null{
    if(date === null){
      return null;
    }

    return new Date(date);
  }
}
