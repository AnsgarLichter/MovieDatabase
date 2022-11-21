import {Injectable} from "@angular/core";
import {Adapter} from "./adapter";
import {WatchProvider, WatchProviderType} from "../models/movieDto";
import {TmdbWatchProvider, TmdbWatchProviders} from "../models/Tmdb/tmdbMovieDto";

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
          true,
          false,
          false,
          watchProvider.logo_path,
          item,
          watchProvider.display_priority
        ))
        ;
      });

      results[item].rent?.forEach((watchProvider: TmdbWatchProvider) => {
        const adaptedWatchProvider = watchProviders.find(includedWatchProvider => includedWatchProvider.providerName === watchProvider.provider_name)
        if (adaptedWatchProvider) {
          adaptedWatchProvider.isAvailableForRent = true;
          return;
        }

        watchProviders.push(new WatchProvider(
          watchProvider.provider_id,
          watchProvider.provider_name,
          false,
          true,
          false,
          watchProvider.logo_path,
          item,
          watchProvider.display_priority
        ));
      });

      results[item].flatrate?.forEach((watchProvider: TmdbWatchProvider) => {
        const adaptedWatchProvider = watchProviders.find(includedWatchProvider => includedWatchProvider.providerName === watchProvider.provider_name)
        if (adaptedWatchProvider) {
          adaptedWatchProvider.isAvailableForRent = true;
          return;
        }

        watchProviders.push(new WatchProvider(
          watchProvider.provider_id,
          watchProvider.provider_name,
          false,
          false,
          true,
          watchProvider.logo_path,
          item,
          watchProvider.display_priority
        ));
      });
    });

    return watchProviders;
  }
}
