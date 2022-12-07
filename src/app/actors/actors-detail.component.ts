import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actors } from '../models/actors.model';
import { Movie } from '../models/movie.model';
import { ActorsService } from '../services/actors.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-actors-detail',
  templateUrl: './actors-detail.component.html',
  styleUrls: ['./actors-detail.component.css']
})
export class ActorsDetailComponent implements OnInit {

  public actors: Actors | undefined;

  private routeParamsSubscription: any;

  constructor(
    private actorsService: ActorsService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.loadActorsDetails("Vin%Diesel");
    });
  }

  private loadActorsDetails(query: string): void {
    this.actorsService.getActors(query)
      .subscribe((actors: Actors) => {
        console.log("Component", actors);
        this.actors = actors;
      });
  }

}
