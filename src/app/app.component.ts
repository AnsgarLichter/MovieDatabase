import {Component} from '@angular/core';
import {Paths} from './paths';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-database';
  linkMovie = Paths.movieSearch;
  linkSeries = Paths.series;
  linkHome = Paths.home;
  linkActors = Paths.actors;
}
