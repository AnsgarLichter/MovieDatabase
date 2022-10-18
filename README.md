# MovieDatabase

Movie Database is a project for the lecture software architectures labratory.

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

### Functional Requirements

* The user must be able to search for movies and series by its title.
* The user must be able to filter his search results for the movies and series by the release year, the region and the genres.
* The user must be able to view the following details of a movie:
  * Title
  * Year
  * Genres
  * User Rating / IMDB Rating
  * Length of the Movie
  * Description of the Plot
  * Release Date
  * Budget
  * Revenue
  * Director, Writer, ...
  * The Platforms on which the movie is available in your current country
  * Cast
  * Poster / Thumbnail
* The user must be able to view the following details of a series:
  * Title
  * Year
  * Genres
  * User Rating / IMDB Rating
  * Length of a typical episode
  * Description of the Plot
  * Release Date
  * Director, Writer, Creators, ...
  * The Platforms on which the movie is available in your current country
  * Seasons inlcuding their release year, their number of episodes and the description
  * Cast
  * Poster / Thumbnail
* The user must be able to search for actors by their names.
* The user must be able to filter his search results for the actors by TODO
* The user must be able to view the following details for an actor:
  * Movies and series in which the actor had screen time
  * Name
  * Biography
  * Profile Picture
* The user must be able to add a movie or a series to his own watchlist.
* The user must be able to view the movies or series in his watchlist.
* The user must be able to remove movies or series from his watchlist.

© 2018 – 2019 [Patrick](https://github.com/patdujmo), [Daniel](https://github.com/linxside), [Ansgar](https://github.com/AnsgarLichter)
