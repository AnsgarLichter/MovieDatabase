import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Actors } from '../models/actors.model';
import { ActorsSearch } from '../models/search-actors.model';
import { ActorsSearchService } from '../services/actors-search.service';
import { ActorsService } from '../services/actors.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-actors-detail',
  templateUrl: './actors-detail.component.html',
  styleUrls: ['./actors-detail.component.css']
})
export class ActorsDetailComponent implements OnInit {

  public actorSearch: ActorsSearch | undefined;
  public actor: Actors | undefined; 
  public biography: string | undefined;
  public searchForm: FormGroup;
  public foundResult: boolean = false;

  private routeParamsSubscription: any;

  constructor(
    private actorsSearchService: ActorsSearchService,
    private actorsService: ActorsService,
    private route: ActivatedRoute,
  ) {
    this.searchForm = new FormGroup({
      query: new FormControl(null, Validators.required),
    });
  }

  onSearchSubmitted(): void {
    const value = this.searchForm.value;
    const searchQuery = String(value.query).replace(' ', '%');
    this.loadActorsSearchDetails(searchQuery);
  }

  ngOnInit(): void {
  }

  private loadActorsSearchDetails(query: string): void {
    this.actorsSearchService.getActors(query)
      .subscribe((actor: ActorsSearch) => {
        this.actorSearch = actor;
        this.loadActorsDetails(actor.id);
        this.foundResult = true;
      });
  }

  private loadActorsDetails(idActor: number): void {
    this.actorsService.getActors(idActor).subscribe((result) => {
      this.biography = result.biography.replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.actor = result;
    });
  }

}
