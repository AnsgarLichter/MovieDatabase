import {Injectable} from "@angular/core";
import {Adapter} from "./base.adapter";
import {WatchProvider, WatchProviderType} from "../models/movie.model";
import {TmdbWatchProvider, TmdbWatchProviderInCountry, TmdbWatchProviders} from "../models/tmdb/tmdb-movie.model";
import {ImageUrlProvider} from "../utilities/image-url-provider";

@Injectable({
  providedIn: "root",
})
export class WatchProvidersAdapter implements Adapter<WatchProvider[]> {
  constructor(private imagePathProvider: ImageUrlProvider) {
  }

  adapt(item: TmdbWatchProviders): WatchProvider[] {
    const results = item.results;
    const adaptedWatchProviders: WatchProvider[] = [];

    (Object.keys(results) as (keyof typeof results)[])
      .forEach(region => this.mapRegion(region, results[region], adaptedWatchProviders));

    return adaptedWatchProviders;
  }

  private mapRegion(region: string, watchProviderTypes: TmdbWatchProviderInCountry, adaptedWatchProviders: WatchProvider[]) {
    (Object.keys(watchProviderTypes) as (keyof typeof watchProviderTypes)[]).forEach(type => {
      if (typeof watchProviderTypes[type] === "string") {
        return;
      }

      const watchProviderType = type as WatchProviderType;
      watchProviderTypes[watchProviderType]?.forEach(watchProvider =>
        this.mapWatchProvider(
          watchProvider,
          watchProviderType,
          region,
          adaptedWatchProviders
        )
      );
    });
  }

  private mapWatchProvider(watchProvider: TmdbWatchProvider, type: WatchProviderType, region: string, adaptedWatchProviders: WatchProvider[]) {
    let adaptedWatchProvider = adaptedWatchProviders.find(
      includedWatchProvider => includedWatchProvider.providerName === watchProvider.provider_name
        && includedWatchProvider.country === region
    );
    if (!adaptedWatchProvider) {
      adaptedWatchProvider = new WatchProvider(
        watchProvider.provider_id,
        watchProvider.provider_name,
        false,
        false,
        false,
        this.imagePathProvider.getLogoUrl(watchProvider.logo_path) || "assets/fallbackPictureWatchProvider.svg",
        region,
        watchProvider.display_priority
      );
      adaptedWatchProviders.push(adaptedWatchProvider);
    }

    this.mapAvailabilityType(type, adaptedWatchProvider);
  }

  private mapAvailabilityType(type: WatchProviderType, adaptedWatchProvider: WatchProvider) {
    switch (type) {
      case "buy":
        adaptedWatchProvider.isAvailableToBuy = true;
        break;
      case "flatrate":
        adaptedWatchProvider.isAvailableInFlatrate = true;
        break;
      case "rent":
        adaptedWatchProvider.isAvailableForRent = true;
        break;
    }
  }
}
