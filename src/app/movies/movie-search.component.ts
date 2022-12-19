import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {SearchService} from "../services/search.service";

import {SearchMovie, SearchResults} from "../models/search-movie.model";

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
})
export class MovieSearchComponent implements OnInit {
  private routeParamsSubscription: any;

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

  private loadSearchResultsByFormValues(): void {
    const value = this.searchForm.value;

    this.movies = [];
    this.loadSearchResults(value.title, value.year?.getFullYear() || null, value.region || null);
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
