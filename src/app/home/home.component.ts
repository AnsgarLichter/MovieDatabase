import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { MovieTrends, ResultsMovie } from '../models/trends-movies.model';
import { ResultsSeries, SeriesTrends } from '../models/trends-series.model';
import { Paths } from '../paths';
import { TrendsMovieService } from '../services/trends-movies.service';
import { TrendsSeriesService } from '../services/trends-series.service';
import { ImageUrlProvider } from '../utilities/image-url-provider';


export interface MovieRow {
  resultMovie: ResultsMovie[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public movieList: ResultsMovie[][] = [];
  public seriesList: ResultsSeries[][] = [];
  public movieTrends:  MovieTrends | undefined;
  public seriesTrends: SeriesTrends | undefined;
  public linkMovies: string = Paths.actors;

  constructor(
    private movieTrendsService: TrendsMovieService, 
    private seriesTrendsService: TrendsSeriesService, 
    private imageUrlProvider: ImageUrlProvider
    ){}

  ngOnInit(): void {
    this.getMovieTrends();
    this.getSeriesTrends();
  }

  getMovieTrends(){
    this.movieTrendsService.getTrendsMovies().subscribe((movieTrends) => {
      this.movieTrends = movieTrends;
      this.initSliderMovies(movieTrends);
    });
  }

  getSeriesTrends(){
    this.seriesTrendsService.getTrendsSeries()
      .subscribe((seriesTrends) => {
      this.seriesTrends = seriesTrends;
      this.initSliderSeries(seriesTrends);
    });
  }

  getRatings(ratingNumber: number | undefined) : string {
    if(ratingNumber !== undefined)
      return Math.round(ratingNumber * 10).toString();

    return "NK"
  }

  public initSliderMovies(movieTrends: MovieTrends){
    if(!movieTrends.results){
      return;
    }
      var arrayRows = Math.ceil(movieTrends.results?.length / 6);
      var maxArrayLength = movieTrends.results?.length;
      var count = 0;
      var value = 0;
      for(var i = 0; i < arrayRows; i++){
        this.movieList[i] = [];
        value = this.checkCount(maxArrayLength, count);
        for(var a = 0; a < value; a++){
          this.movieList[i][a] = movieTrends.results[count];
          count++;
        }
      }
      this.fillElementsMovies(6 - value, movieTrends);
  }

  public initSliderSeries(seriesTrends: SeriesTrends){
    if(!seriesTrends.results){
      return;
    }
      var arrayRows = Math.ceil(seriesTrends.results?.length / 6);
      var maxArrayLength = seriesTrends.results?.length;
      var count = 0;
      var value = 0;
      for(var i = 0; i < arrayRows; i++){
        this.seriesList[i] = [];
        value = this.checkCount(maxArrayLength, count);
        for(var a = 0; a < value; a++){
          this.seriesList[i][a] = seriesTrends.results[count];
          count++;
        }
      }
      this.fillElementsSeries(6 - value, seriesTrends);
  }


  public checkCount(maxArrayLength: number, counter: number): number{
    if((maxArrayLength - counter) < 6){
      return maxArrayLength - counter;
    }
    return 6;
  }

  public fillElementsMovies(elm: number, movieTrends: MovieTrends){
      if(elm === 0){
        return;
      }
      var movieListLength = this.movieList.length - 1;
      for(var i = 0; i < elm; i++){
        this.movieList[movieListLength].push(movieTrends.results[i]);
      }
  }

  public fillElementsSeries(elm: number, seriesTrends: SeriesTrends){
    if(elm === 0){
      return;
    }
    var seriesListLength = this.seriesList.length - 1;
    for(var i = 0; i < elm; i++){
      this.seriesList[seriesListLength].push(seriesTrends.results[i]);
    }
}
}
