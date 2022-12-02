import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {SearchService} from "../services/search.service";

import {SearchMovie, SearchResults} from "../models/search-movie.model";
import {Platform} from "@angular/cdk/platform";
import {DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter} from "@angular/material/core";

export class YearPickerDateAdapter extends NativeDateAdapter {
  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
  }

  override parse(value: string): Date | null {
    const regexYear = /[\d]{4}/;

    if (value?.match(regexYear)) {
      return new Date(value);
    }

    return null;
  }

  override format(date: Date, displayFormat: any): string {
    return date.getFullYear().toString();
  }
}


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: YearPickerDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ],
})
export class MovieSearchComponent implements OnInit {
  private routeParamsSubscription: any;

  public query: string | null | undefined;
  public movies: SearchMovie[] = [];
  private currentPage: number | undefined;
  private totalPages: number | undefined;

  public searchForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) {
    this.searchForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      year: new FormControl(
        null,
        [Validators.minLength(4), Validators.maxLength(4)]
      ),
      region: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.query = params['query'];
      this.loadSearchResultsByQuery();
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  onSearchSubmitted(): void {
    //TODO: Region value should be code2
    //TODO: Clear value of date field should be possible
    const value = this.searchForm.value;

    this.movies = [];
    this.loadSearchResults(value.title, value.year?.getFullYear() || null, value.region || null);
  }

  onYearSelected(value: any, datePicker: any): void {
    datePicker.close();
    this.searchForm.get("year")?.setValue(value);
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

  private loadSearchResultsByQuery(): void {
    if (!this.query) {
      return;
    }

    this.loadSearchResults(this.query);
  }

  private loadSearchResults(movieTitle: string, year?: number, region?: string, page?: number): void {
    if (!movieTitle) {
      return;
    }

    this.searchService.searchMovies(movieTitle, year, region, page)
      .subscribe((results: SearchResults<SearchMovie>) => {
        this.currentPage = results.page;
        this.totalPages = results.totalPages;
        this.movies?.push(...results.results);
      });
  }

}
