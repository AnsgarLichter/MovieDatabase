import { Component, OnInit } from '@angular/core';
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

  private routeParamsSubscription: any;

  constructor(
    private actorsSearchService: ActorsSearchService,
    private actorsService: ActorsService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.loadActorsSearchDetails("Vin%Diesel");
      this.loadActorsDetails(12835);
    });
  }

  private loadActorsSearchDetails(query: string): void {
    this.actorsSearchService.getActors(query)
      .subscribe((actor: ActorsSearch) => {
        console.log("Component", actor);
        this.actorSearch = actor;
      });
  }

  private loadActorsDetails(idActor: number): void {
    this.actorsService.getActors(idActor).subscribe((result) => {
      console.log("Details", result);
      this.actor = result;
    });
  }

}
