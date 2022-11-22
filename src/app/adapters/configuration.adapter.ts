import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";
import {Configuration, Image} from "../models/configuration.model";
import {TmdbConfiguration} from "../models/tmdb/tmdb-configuration.model";
import {ImagePathProvider} from "../utilities/image-path-provider";

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
