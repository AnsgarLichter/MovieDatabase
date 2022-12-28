import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Actors, Cast, CombinedCredits, Crew } from '../models/actors.model';
import { ActorsSearch } from '../models/search-actors.model';
import { ActorsService } from '../services/actors.service';
import { ActorsSearchService } from '../services/search-actors.service';

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
  public actorName: string | undefined;
  public combinedCredits: CombinedCredits | undefined;
  public cast: Cast[] = [];
  public crew: Crew[] = [];

  constructor(
    private actorsService: ActorsService,
    private actorsSearchService: ActorsSearchService,
    private route: ActivatedRoute,
  ) {
    this.searchForm = new FormGroup({
      query: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadActorsDetails(+params['id']);
    });
  }

  private loadActorsSearchDetails(query: string, id: number): void {
    this.actorsSearchService.getActorsSearch(query, id)
      .subscribe((results) => {
        results.results.forEach((actor) => this.actorSearch = actor);
        this.foundResult = true;
      });
  }

  private loadActorsDetails(idActor: number): void {
    this.actorsService.getActors(idActor, true).subscribe((result) => {
      this.biography = result.biography.replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.actor = result;
      this.combinedCredits = result.combined_credits;
      this.actorName = String(result.name).replace(' ', '%');
      this.loadActorsSearchDetails(this.actorName, result.id);
      this.cast = result.combined_credits.cast;
      this.crew = result.combined_credits.crew;
      console.log("Cast Test", result.combined_credits.cast);
      console.log("Crew Test", result.combined_credits.crew);
    });
  }
}
