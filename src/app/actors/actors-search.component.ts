import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorsSearchFlat } from '../models/search-actors-flat.model';
import { ActorsSearchService } from '../services/search-actors.service';

@Component({
  selector: 'app-actors-search',
  templateUrl: './actors-search.component.html',
  styleUrls: ['./actors-search.component.css']
})
export class ActorsSearchComponent {

  public searchForm: FormGroup;
  public foundResult: boolean = false;
  public actorsList: ActorsSearchFlat[] = [];
  private currentPage: number | undefined;
  private totalPages: number | undefined;

  constructor(private actorsSearchService: ActorsSearchService) {
    this.searchForm = new FormGroup({
      query: new FormControl(null, Validators.required),
    });
  }
  
  onSearchSubmitted(): void {
    const value = this.searchForm.value;
    const searchQuery = String(value.query).replace(' ', '%');
    this.getActors(searchQuery);
  }

  public getActors(searchQuery: string, page?: number){
    if(!searchQuery) {
      return;
    }

    this.actorsSearchService.getActorsFlat(searchQuery, page).subscribe((results) => { 
      this.currentPage = results.page;
      this.totalPages = results.totalPages;
      this.actorsList?.push(...results.results);
    });
  }

  onLoadMoreResultsPressed(): void {
    if (!this.currentPage || !this.totalPages || this.currentPage >= this.totalPages) {
      return;
    }
    const value = this.searchForm.value;
    const searchQuery = String(value.query).replace(' ', '%');
    this.getActors(searchQuery, ++this.currentPage);
  }

}
