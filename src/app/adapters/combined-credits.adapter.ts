import { Injectable } from "@angular/core";
import { Adapter } from "./base.adapter";
import { Cast, CombinedCredits, Crew } from "../models/actors.model";
import { TmdbCast, TmdbCombinedCredits, TmdbCrew } from "../models/tmdb/tmdb-actors.model";

@Injectable({
  providedIn: "root",
})
export class CombinedCreditsAdapter implements Adapter<CombinedCredits> {

  adapt(combinedCredits: TmdbCombinedCredits): CombinedCredits {
    const cast = combinedCredits.cast.map((results) => (this.adaptCast(results)));

    const test = cast.sort((a, b) => +(new Date(b.release_date)) - +(new Date(a.release_date)));

    /*const testCast: Cast[] = [];
    cast.forEach((result) => {
      if(result.release_date !== "Upcoming"){
        testCast.push(result);
      } 
    });
    const newCast = testCast.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    console.log("TestCast: ", newCast);
    console.log("Cast: ", cast);
    const sortCast = cast.sort((a, b) => +(new Date(b.release_date)) - +(new Date(a.release_date)));*""

    /*.sort((a, b) => +b.release_date - +a.release_date);*/
    console.log("Test 1: ", test);
    const crew = combinedCredits.crew.map((results) => (this.adaptCrew(results))).sort((a, b) => +b.release_date - +a.release_date);
    return new CombinedCredits(
      cast,
      crew,
    );
  }
/*
  const test=cast.sort((a, b) => {
    if(a.release_date < b.release_date){
      return 1;
    }
    if(a.release_date > b.release_date){
      return -1;
    }
    return 0;
  })*/

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
      this.adaptReleaseAndFirstAirDate(cast.release_date, cast.first_air_date),
      cast.title,
      cast.video,
      cast.vote_average,
      cast.vote_count,
      cast.character,
      cast.credit_id,
      cast.order,
      cast.media_type,
      cast.episode_count,
      );
  }

  adaptReleaseAndFirstAirDate(releaseDate: string, firstAirDate: string): string {
    if(releaseDate === "" || firstAirDate === ""){
        return "Upcoming";
    }
    if(releaseDate !== undefined && firstAirDate === undefined){
      return new Date(releaseDate).toLocaleDateString();
    }
    if(firstAirDate !== undefined && releaseDate === undefined){
      return new Date(firstAirDate).toLocaleDateString();
    }
    return "Upcoming";
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
      this.adaptReleaseDate(crew.release_date),
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

  adaptDateOnlyInYear(releaseDate: string, firstAirDate: string) : string{
    if(releaseDate === "" || firstAirDate === ""){
      return "Upcoming";
    }
    if(releaseDate !== undefined && firstAirDate === undefined){
      return new Date(releaseDate).toLocaleDateString();
    }
    if(firstAirDate !== undefined && releaseDate === undefined){
      return new Date(firstAirDate).toLocaleDateString();
    }
    return "Upcoming";
  }

  adaptReleaseDate(releaseDate: string): string{
    if(releaseDate === ""){
      return "Upcoming";
    }
    if(releaseDate !== undefined){
      return new Date(releaseDate).toLocaleDateString();
    }
    return "Upcoming";
  }
}
