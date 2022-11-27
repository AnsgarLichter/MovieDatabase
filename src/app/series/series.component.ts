import { Component, OnInit } from '@angular/core';
import {TvShow} from "../models/tv-show.model";
import { TVShowService} from "../services/series.service";
import {ActivatedRoute} from "@angular/router";
import {Configuration} from "../models/configuration.model";
import {ConfigurationService} from "../services/configuration.service";

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  constructor(private tvShowService: TVShowService, private route: ActivatedRoute, private configurationService: ConfigurationService) {
    this.route.params.subscribe(params => this.showID = params["id"])
  }

  public tvShow: TvShow | undefined;
  private showID: number = 0;
  public configuration: Configuration | undefined;

  ngOnInit(): void {
    this.getTVShow(this.showID);
  }

  getTVShow(id: number) {
    this.tvShowService.getTVShow(id).subscribe((tvShow: TvShow) => {
      console.log(tvShow);
      this.tvShow = tvShow;
    });
  }

  getImagePath(): string {
    if (!this.configuration?.images?.baseUrl || !this.configuration.images.backdropSizes.length) {
      return "";
    }

    return this.configuration?.images?.baseUrl + this.configuration?.images?.backdropSizes[2].toString()
  }

  private loadConfiguration(): void {
    this.configurationService.getConfiguration().subscribe((configuration: Configuration) => {
      this.configuration = configuration;
    });
  }
}
