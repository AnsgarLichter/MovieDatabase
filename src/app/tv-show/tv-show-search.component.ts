import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {TVShowService} from "../services/tv-show.service";
import {SearchResults} from "../models/search-movie.model";
import {SearchTVShow} from "../models/search-tv-show.model";

@Component({
  selector: 'app-tv-show-search',
  templateUrl: './tv-show-search.component.html',
  styleUrls: ['./tv-show-search.component.css']
})
export class TVShowSearchComponent implements OnInit {
  private routeParamsSubscription: any;

  public tvShows: SearchTVShow[] = [];
  public currentPage: number = 0;
  public totalPages: number = 0;

  public searchForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private searchService: TVShowService,
  ) {
    this.searchForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      year: new FormControl(
        null,
        [Validators.minLength(4), Validators.maxLength(4), Validators.min(1800), Validators.max(new Date().getFullYear())]
      ),
      region: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      const query = params['query'];
      if(!query) {
        return;
      }

      this.searchForm.get("title")?.setValue(query);
      this.loadSearchResultsByFormValues();
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  onSearchSubmitted(): void {
    this.loadSearchResultsByFormValues();
  }
  onLoadMoreResultsPressed(): void {
    if (!this.currentPage || !this.totalPages || this.currentPage >= this.totalPages) {
      return;
    }

    const value = this.searchForm.value;
    this.loadSearchResults(
      value.title,
      value.year?.getFullYear() || null,
      value.region || null,
      ++this.currentPage
    );
  }

  private loadSearchResultsByFormValues(): void {
    const value = this.searchForm.value;

    this.tvShows = [];
    this.loadSearchResults(value.title, value.year?.getFullYear() || null, value.region || null);
  }

  private loadSearchResults(tvShowName: string, year?: number, region?: string, page?: number): void {
    if (!tvShowName) {
      return;
    }

    this.searchService.searchTVShows(tvShowName, year, region, page)
      .subscribe((results: SearchResults<SearchTVShow>) => {
        this.currentPage = results.page;
        this.totalPages = results.totalPages;
        this.tvShows?.push(...results.results);
      });
  }

}
