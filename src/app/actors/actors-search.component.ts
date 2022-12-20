import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorsSearchNew } from '../models/search-actors-new.model';
import { ActorsSearchService } from '../services/actors-search.service';

@Component({
  selector: 'app-actors-search',
  templateUrl: './actors-search.component.html',
  styleUrls: ['./actors-search.component.css']
})
export class ActorsSearchComponent implements OnInit {

  public searchForm: FormGroup;
  public foundResult: boolean = false;
  public actorsList: ActorsSearchNew[] = [];

  constructor(private actorsSearchService: ActorsSearchService) {
    this.searchForm = new FormGroup({
      query: new FormControl(null, Validators.required),
    });
   }

  ngOnInit(): void {
  }

  
  onSearchSubmitted(): void {
    const value = this.searchForm.value;
    const searchQuery = String(value.query).replace(' ', '%');
    this.getActors(searchQuery);
  }

  public getActors(searchQuery: string){
    console.log(searchQuery);
    this.actorsSearchService.getActors(searchQuery).subscribe((actorsList) => { 
      console.log(actorsList);
      this.actorsList = actorsList;
    });
  }

}
