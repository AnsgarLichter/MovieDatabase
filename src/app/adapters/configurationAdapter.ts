import {Injectable} from "@angular/core";
import {Adapter} from "./adapter";
import {Configuration, Image} from "../models/configurationDto";
import {TmdbConfiguration} from "../models/Tmdb/tmdbConfiguration";

@Injectable({
  providedIn: "root",
})
export class ConfigurationAdapter implements Adapter<Configuration> {
  adapt(item: TmdbConfiguration): Configuration {
    const images = new Image(
      item.images.base_url,
      item.images.secure_base_url,
      item.images.backdrop_sizes,
      item.images.logo_sizes,
      item.images.poster_size,
      item.images.profile_sizes,
      item.images.still_sizes,
    );

    return new Configuration(
      images
    );
  }
}
