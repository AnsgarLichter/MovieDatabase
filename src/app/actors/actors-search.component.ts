import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorsSearchFlat } from '../models/search-actors-new.model';
import { ActorsSearchService } from '../services/actors-search.service';

@Component({
  selector: 'app-actors-search',
  templateUrl: './actors-search.component.html',
  styleUrls: ['./actors-search.component.css']
})
export class ActorsSearchComponent {

  public searchForm: FormGroup;
  public foundResult: boolean = false;
  public actorsList: ActorsSearchFlat[] = [];

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

  public getActors(searchQuery: string){
    this.actorsSearchService.getActors(searchQuery).subscribe((actorsList) => { 
      this.actorsList = actorsList;
    });
  }

}
