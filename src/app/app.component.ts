import { Component } from '@angular/core';
import { Paths } from './Paths';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-database';
  linkMovie= Paths.movies;
  linkSeries = Paths.series;
  linkHome = Paths.home;
}
