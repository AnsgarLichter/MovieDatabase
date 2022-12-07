import { Injectable } from "@angular/core";
import { Adapter } from "./base.adapter";
import { Actors, KnownFor } from "../models/actors.model";
import { TmdbActors, TmdbSearchActorsResult } from "../models/tmdb/tmdb-actors.model";
import { TmdbSearchResults } from "../models/tmdb/tdmb-search-result.model";
import { TmdbSearchSimpleResult } from "../models/tmdb/tmdb-search-simple-result.model";

@Injectable({
  providedIn: "root",
})
export class ActorsAdapter implements Adapter<Actors> {


  adapt(item: TmdbSearchActorsResult): Actors {
    let actors: TmdbActors | undefined;
    
    const test = item.results.map((item) => actors = item);
   
    return new Actors(
      test[0].adult,
      test[0].gender,
      test[0].id,
      test[0].known_for,
      test[0].known_for_department,
      test[0].name,
      test[0].popularity,
      test[0].profile_path
    );
  }

  private adaptActors(actors: TmdbActors): Actors {
    console.log("Adapt", actors);
    return new Actors(
      actors.adult,
      actors.gender,
      actors.id,
      actors.known_for,
      actors.known_for_department,
      actors.name,
      actors.popularity,
      actors.profile_path
    )
  }

  private knownForAdapter(knownFor: KnownFor): KnownFor{
    return new KnownFor(
      knownFor.adult,
      knownFor.backdrop_path,
      knownFor.genre_ids,
      knownFor.id,
      knownFor.media_type,
      knownFor.original_language,
      knownFor.original_title,
      knownFor.overview,
      knownFor.poster_path,
      knownFor.release_date,
      knownFor.title,
      //knownFor.popularity,
      knownFor.video,
      knownFor.vote_average,
      knownFor.vote_count
    );
  }
}
