import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {MovieDetailComponent} from './movies/movie-detail.component';
import {SeriesComponent} from './series/series.component';
import {HttpClientModule} from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MovieSearchComponent} from './movies/movie-search.component';
import {ImageUrlProvider} from "./utilities/image-url-provider";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeriesComponent,
    MovieDetailComponent,
    MovieSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [ImageUrlProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
