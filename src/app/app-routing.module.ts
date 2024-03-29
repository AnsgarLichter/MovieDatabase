import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { Paths } from './paths';

import { HomeComponent } from './home/home.component';

import { MovieDetailComponent } from './movies/movie-detail.component';
import {MovieSearchComponent} from "./movies/movie-search.component";

import { TvShowDetailComponent } from './tv-show/tv-show-detail.component';
import {TVShowSearchComponent} from "./tv-show/tv-show-search.component";
import { ActorsDetailComponent } from './actors/actors-detail.component';
import { ActorsSearchComponent } from './actors/actors-search.component';


const routes: Routes = [
  { path: '', redirectTo: Paths.home, pathMatch: 'full'},
  { path: Paths.home, component: HomeComponent},
  { path: Paths.actors, component: ActorsSearchComponent},
  { path: Paths.actorsDetail, component: ActorsDetailComponent},
  { path: Paths.movieSearch, component: MovieSearchComponent},
  { path: Paths.movieDetail, component: MovieDetailComponent},
  { path: Paths.series, component: TVShowSearchComponent},
  { path: Paths.seriesDetail, component: TvShowDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
