import { Component, OnInit } from '@angular/core';
import { MovieTrends, SeriesTrends } from '../models/trends.model';
import { TrendsService } from '../services/trends.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movieTrends: MovieTrends | undefined;
  public seriesTrends: SeriesTrends | undefined;

  constructor(private trendsService: TrendsService) { }

  ngOnInit(): void {
    this.getMovieTrends();
    this.getSeriesTrends();
  }

  getMovieTrends(){
    this.trendsService.getTrendsMovies().subscribe((movieTrends) => {
      this.movieTrends = movieTrends;
      console.log(movieTrends);
    });
  }

  getSeriesTrends(){
    this.trendsService.getTrendsSeries()
      .subscribe((seriesTrends) => {
      this.seriesTrends = seriesTrends;
      console.log(seriesTrends);
    });
  }
}
