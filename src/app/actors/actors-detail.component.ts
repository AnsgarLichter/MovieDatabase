import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Actors } from '../models/actors.model';
import { ActorsSearch } from '../models/search-actors.model';
import { ActorsService } from '../services/actors.service';

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

  constructor(
    private actorsService: ActorsService,
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

  private loadActorsSearchDetails(query: string): void {
    this.actorsService.getActorsDetails(query)
      .subscribe((actor: ActorsSearch) => {
        this.actorSearch = actor;
        this.foundResult = true;
      });
  }

  private loadActorsDetails(idActor: number): void {
    this.actorsService.getActors(idActor).subscribe((result) => {
      this.biography = result.biography.replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.actor = result;
      this.actorName = String(result.name).replace(' ', '%');;
      this.loadActorsSearchDetails(this.actorName);
    });
  }

}
