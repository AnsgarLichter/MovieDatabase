import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { Paths } from './Paths';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
  { path: '', redirectTo: Paths.home, pathMatch: 'full'},
  { path: Paths.home, component: HomeComponent},
  { path: Paths.movies, component: MoviesComponent},
  { path: Paths.series, component: SeriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
