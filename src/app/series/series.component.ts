import { Component, OnInit } from '@angular/core';
import {TvShow} from "../models/tv-show.model";
import { TVShowService} from "../services/tv-show.service";
import {ActivatedRoute} from "@angular/router";
import {Configuration} from "../models/configuration.model";
import {ConfigurationService} from "../services/configuration.service";
import {WatchProvider} from "../models/movie.model";
import {FormControl, FormGroup} from "@angular/forms";
import {MovieDetailComponent} from "../movies/movie-detail.component";

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  constructor(private tvShowService: TVShowService, private route: ActivatedRoute, private configurationService: ConfigurationService) {
    this.route.params.subscribe(params => this.showID = params["id"]);

    const region = MovieDetailComponent.getCurrentCountryCodeByNavigatorLanguage();
    this.countryForm = new FormGroup({
      region: new FormControl(region),
    });
  }

  public tvShow: TvShow | undefined;
  private showID: number = 0;
  public configuration: Configuration | undefined;
  public watchProvidersInCurrentCountry: WatchProvider[] | undefined;
  public countryForm: FormGroup;


  ngOnInit(): void {
    this.loadConfiguration()
    this.getTVShow(this.showID);
  }

  getTVShow(id: number) {
    this.tvShowService.getTVShow(id).subscribe((tvShow: TvShow) => {
      this.tvShow = tvShow;
    });
  }
  private loadConfiguration(): void {
    this.configurationService.getConfiguration().subscribe((configuration: Configuration) => {
      this.configuration = configuration;
    });
  }
  private updateWatchProviders(): void {
    const selectedCountryCode = this.countryForm.value.region;
    if (!selectedCountryCode) {
      return;
    }

    this.watchProvidersInCurrentCountry = this.tvShow?.watchProvider
      .filter(watchProvider => watchProvider.country === selectedCountryCode)
      .sort((a: WatchProvider, b: WatchProvider) =>
        a.displayPriority - b.displayPriority
      );
  }

  onCountrySelectionChanged(): void {
    this.updateWatchProviders();
  }
}
