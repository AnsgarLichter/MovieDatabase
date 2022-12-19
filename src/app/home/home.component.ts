import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { MovieTrends, ResultsMovie, SeriesTrends, ResultsSeries } from '../models/trends.model';
import { TrendsService } from '../services/trends.service';
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

  constructor(private trendsService: TrendsService, private imageUrlProvider: ImageUrlProvider) { }

  ngOnInit(): void {
    this.getMovieTrends();
    this.getSeriesTrends();
  }

  getMovieTrends(){
    this.trendsService.getTrendsMovies().subscribe((movieTrends) => {
      this.movieTrends = movieTrends;
      this.initSliderMovies(movieTrends);
    });
  }

  getSeriesTrends(){
    this.trendsService.getTrendsSeries()
      .subscribe((seriesTrends) => {
      this.seriesTrends = seriesTrends;
      this.initSliderSeries(seriesTrends);
    });
  }

  getPosterImages(posterPath: string | undefined){
    if(posterPath !== undefined){
      return this.imageUrlProvider.getPosterUrl(posterPath);
    }
    return "Test";
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
      // 20 - 18
      console.log("Max: " + maxArrayLength, "Actual: " + counter);
      return maxArrayLength - counter;
    }
    console.log("Max: " + maxArrayLength, "Actual: " + counter);
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

  getDate(date: string | undefined): string {
    if(date !== undefined) {
      var dateTest = new Date(date);
      return dateTest.toLocaleDateString();
    }

    return "Test";
  }
}
