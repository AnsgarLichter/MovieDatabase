import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";
import {CastMember} from "../models/movie.model";
import {TmdbCastMember} from "../models/tmdb/tmdb-movie.model";
import {ImageUrlProvider} from "../utilities/image-url-provider";

@Injectable({
  providedIn: "root",
})
export class CastAdapter implements Adapter<CastMember> {
  constructor(private imagePathProvider: ImageUrlProvider) {
  }


  adapt(item: TmdbCastMember): CastMember {
    let profilePath = this.imagePathProvider.getProfileUrl(item.profile_path);
    if (!item.profile_path || !profilePath) {
      profilePath = item.gender === 1
        ? 'assets/fallbackProfilePictureWoman.svg'
        : 'assets/fallbackProfilePictureMan.svg';
    }

    return new CastMember(
      item.id,
      item.cast_id,
      item.credit_id,
      item.original_name,
      item.name,
      item.gender,
      item.character,
      item.order,
      profilePath,
    );
  }
}
