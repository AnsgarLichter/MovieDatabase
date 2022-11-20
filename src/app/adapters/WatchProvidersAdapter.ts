import {Injectable} from "@angular/core";
import {Adapter} from "./adapter";
import {WatchProvider, WatchProviderType} from "../models/movieDto";
import {TmdbWatchProvider, TmdbWatchProviders} from "../models/tmdbMovieDto";

@Injectable({
  providedIn: "root",
})
export class WatchProvidersAdapter implements Adapter<WatchProvider[]> {
  adapt(item: TmdbWatchProviders): WatchProvider[] {
    const results = item.results;
    const watchProviders: WatchProvider[] = [];

    (Object.keys(results) as (keyof typeof results)[]).forEach(item => {
      //TODO: Object.keys of results[item] but exclude property "link"
      results[item].buy?.forEach((watchProvider: TmdbWatchProvider) => {
        watchProviders.push(new WatchProvider(
          watchProvider.provider_id,
          watchProvider.provider_name,
          WatchProviderType.buy,
          watchProvider.logo_path,
          item,
          watchProvider.display_priority
        ));
      });

      results[item].rent?.forEach((watchProvider: TmdbWatchProvider) => {
        watchProviders.push(new WatchProvider(
          watchProvider.provider_id,
          watchProvider.provider_name,
          WatchProviderType.rent,
          watchProvider.logo_path,
          item,
          watchProvider.display_priority
        ));
      });

      results[item].flatrate?.forEach((watchProvider: TmdbWatchProvider) => {
        watchProviders.push(new WatchProvider(
          watchProvider.provider_id,
          watchProvider.provider_name,
          WatchProviderType.flatrate,
          watchProvider.logo_path,
          item,
          watchProvider.display_priority
        ));
      });
    });

    return watchProviders;
  }
}
