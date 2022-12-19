import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Paths } from './paths';

import { HomeComponent } from './home/home.component';

import { MovieDetailComponent } from './movies/movie-detail.component';
import {MovieSearchComponent} from "./movies/movie-search.component";

import { SeriesComponent } from './series/series.component';
import {TvShowOverviewComponent} from "./tv-show-overview/tv-show-overview.component";
import { ActorsSearchComponent } from './actors/actors-search.component';
import { ActorsDetailComponent } from './actors/actors-detail.component';


const routes: Routes = [
  { path: '', redirectTo: Paths.home, pathMatch: 'full'},
  { path: Paths.home, component: HomeComponent},
  { path: Paths.actors, component: ActorsDetailComponent},
  { path: Paths.movieSearch, component: MovieSearchComponent},
  { path: Paths.movieDetail, component: MovieDetailComponent},
  { path: Paths.series, component: TvShowOverviewComponent},
  { path: Paths.seriesDetail, component: SeriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
