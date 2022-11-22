import {ConfigurationService} from "../services/configuration.service";
import {Configuration} from "../models/configuration.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ImagePathProvider {
  private configuration: Configuration | undefined

  constructor(private configurationService: ConfigurationService) {
    this.configurationService.getConfiguration().subscribe(
      (configuration: Configuration) => this.configuration = configuration
    );
  }

  getBackdropUrl(backdropPath: string): string | null {
    return this.constructImageUrl(this.configuration?.images.backdropSizes, backdropPath);
  }

  getProfileUrl(profilePath: string): string | null {
    return this.constructImageUrl(this.configuration?.images.profileSizes, profilePath);
  }

  getPosterUrl(posterPath: string): string | null {
    return this.constructImageUrl(this.configuration?.images.posterSizes, posterPath);
  }

  private getImageBaseUrl(): string | undefined {
    return this.configuration?.images.baseUrl;
  }

  private constructImageUrl(availableSizes: string[] | undefined, imagePath: string): string | null {
    if (!availableSizes || !availableSizes.length) {
      return null;
    }

    const chosenSize = availableSizes.length === 2 ? availableSizes.length - 1 : availableSizes.length - 2;
    return `${this.getImageBaseUrl()}${availableSizes[chosenSize]}${imagePath}`
  }
}
