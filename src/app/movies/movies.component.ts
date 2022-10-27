import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movieDto';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public movie: Movie | undefined; 

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovie(76341);
  }

  getMovie(movieId: number){
    this.moviesService.getMovie(movieId).subscribe((movie: Movie) => {
      console.log(movie);
      this.movie = movie;
    });
  }

}
