# MovieDatabase

Movie Database is a project for the lecture software architectures laboratory.

## Getting Started

### Providing Values for Secrets

You need to add your API key for the [The Movie Database API](https://www.themoviedb.org/?language=de) in the ``.env`` file.
Please rename ``template.env`` to ``.env`` and provide your own API key accordingly.
Afterwards you can run ``ng serve`` to start your development server.

The values of the secrets can be accessed as follows ``process.env["ENVIRONMENT_VARIABLE_KEY"]``.

### Adding new secrets

If you want to add a new secret, please add the new environment variable in the following files:

* environment.ts
* environment.prod.ts
* template.env
* .env

If you restart your development server now, the environment variable will be accessible.

### Conventional Commits

The app uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to have consistent commit messages.
[Husky](https://typicode.github.io/husky/#/) is used to enable the use of versionized git hooks. In this context the hook ``commit-msg`` is used to validate if the commit messages fullfill the convetional commits specification.

Please make you familiar with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Technologies

### Angular

This app uses Angular version 14 as framework for web development.
If you want to know how to build and run the app you can have a look at the [Angular CLI](https://angular.io/cli).

### Angular Material

The app is built with the UI components of [Angular Material](https://material.angular.io/).
At the moment the built-in theme pink bluegrey is configured.

### Movie Database API

This app uses the API of the [The Movie Database](https://www.themoviedb.org/?language=de). This API is the source for all movies, series and actors.

## Requirements

### Functional Requirements + possible API Datasources

* The user must be able to search for movies and series by its title.
  * API: /search/multi for searching movies, tv show and people (responds: title, image path, genres, ...)
  * API: /search/tv for search tv shows (responds: title, image path, genres, ...)
  * API: /search/movie for search movies (responds: title, image path, genres, ...)
* The user must be able to filter his search results for the movies and series by the release year, the region and the genres.
  * API: /search/multi can't filter for the year and for the genres 
  * API: /search/tv can't filter for the genres and the region
  * API: /search/movie can't filter for the genres
  * API: /discover/movie has all required filters but can't take the title for search
  * API: /discover/tv has all required filters but can't take the title for search
* The user must be able to view the following details of a movie:
  * Title
    * API: part of search result
  * Year
    * API: part of search result
  * Genres
    * API: /movie/{id}
  * User Rating / IMDB Rating
    * API: part of search result (TMDB reviews)
    * API: /movie/{id}/external_ids -> query IMDB (for IMDB reviews)
  * Length of the Movie
    * API: /movie/{id}
  * Description of the Plot
    * API: /movie/{id}
  * Release Date
    * API: part of search result
  * Budget
    * API: /movie/{id}
  * Revenue
    * API: /movie/{id}
  * Director, Writer, ...
    * API: /movie/{id}?append_to_response=credits or /movie/{id]/credits
  * The Platforms on which the movie is available in your current country
    * API: /movie/{id}/watch/providers
  * Cast
    * API: same as Director, Writer, ...
  * Poster / Thumbnail
    * API: part of search result + query image.tmdb.org
* The user must be able to view the following details of a series:
  * Title
    * API: part of search result
  * Year
    * API: part of search result
  * Genres
    * API: /tv/{id}
  * User Rating / IMDB Rating
    * API: part of search result (TMDB reviews)
    * API: /tv/{id}/external_ids -> query IMDB (for IMDB reviews)
  * Length of a typical episode
    * API: /tv/{id} average of first and last episode or calculate average of all episodes and seasons
  * Description of the Plot
    * API: /tv/{id}
  * Release Date
    * API: /tv/{id}
  * Director, Writer, Creators, ...
    * API: /tv/{id}?append_to_response=credits or /tv/{id]/credits
  * The Platforms on which the movie is available in your current country
    * API: /tv/{id}/watch/providers
  * Seasons including their release year, their number of episodes and the description
    * API: /tv/{id} (for all seasons except the description)
    * API: /tv/{id}/season/ (for the description of one season)
  * Cast
    * API: same as Director, Writer, ...
  * Poster / Thumbnail
    * API: part of search result + query image.tmdb.org
* The user must be able to search for actors by their names.
  * API: /search/multi for searching movies, tv show and people
  * API: /search/person
* The user must be able to view the following details for an actor:
  * Movies and series in which the actor had screen time
    * API: /person/{id}/movie_credits
    * API: /person/{id}/tv_credits
  * Name
    * API: part of search result
  * Biography
    * API: /person/{id}
  * Profile Picture
    * API: part of search result + query image.tmdb.org
* The user must be able to shown the current film or movie trends from today and the week: 
  * API: /trending/{media_type}/{time_window}

### Optional Requirements
* The User must be able to see the movies and series with the best ratings: 
  * API: /movie/top_rated
* The user must be able to add a movie or a series to his own watchlist.
  * API: POST /list + POST /list/{id}(add_item)
* The user must be able to view the movies or series in his watchlist.
  * API: /list/{id}
* The user must be able to remove movies or series from his watchlist.
  * API: POST /list/{id}/remove_item

© 2022 [Patrick](https://github.com/patdujmo), [Daniel](https://github.com/linxside), [Ansgar](https://github.com/AnsgarLichter)
