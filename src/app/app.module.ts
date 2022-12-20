import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from "@angular/material/select";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HomeComponent} from './home/home.component';
import {MovieSearchComponent} from './movies/movie-search.component';
import {MovieDetailComponent} from './movies/movie-detail.component';
import {SeriesComponent} from './series/series.component';

import {ImageUrlProvider} from "./utilities/image-url-provider";
import {TVShowSearchComponent} from "./tv-show-search/tv-show-search.component";
import {PersonCardComponent} from './person-card/person-card.component';
import {StreamingProviderCardComponent} from './streaming-provider-card/streaming-provider-card.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {CountrySelectComponent} from './country-select/country-select.component';
import {YearPickerComponent} from './year-picker/year-picker.component';
import { ActorsDetailComponent } from './actors/actors-detail.component';
import { ActorsSearchComponent } from './actors/actors-search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeriesComponent,
    MovieDetailComponent,
    MovieSearchComponent,
    TVShowSearchComponent,
    PersonCardComponent,
    StreamingProviderCardComponent,
    CountrySelectComponent,
    YearPickerComponent,
    ActorsDetailComponent,
    ActorsSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressBarModule,
    MatExpansionModule,
  ],
  providers: [ImageUrlProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
