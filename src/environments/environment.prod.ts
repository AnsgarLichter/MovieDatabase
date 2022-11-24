export const environment = {
  production: false,
  movieDbApi: 'https://api.themoviedb.org',
  movieDbApiKey: process.env['THE_MOVIE_DATABASE_API_KEY'] || undefined,
  movieDbApiVersion: '3'
};
