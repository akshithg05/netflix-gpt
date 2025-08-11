export const NOW_PLAYING_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

export const POPULAR_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

export const TOP_RATED_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

export const UPCOMING_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

export const ACTION_MOVIES_URL =
  "https://api.themoviedb.org/3/discover/movie?with_genres=28&language=en-US&sort_by=popularity.desc&page=1";

export const HORROR_MOVIES_URL =
  "https://api.themoviedb.org/3/discover/movie?with_genres=27&language=en-US&sort_by=popularity.desc&page=1";

export const getMovieTrailerUrl = (movieId) =>
  `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

export const getTMDBImageUrl = (img) =>
  `https://image.tmdb.org/t/p/w500/${img}`;

export const searchMovieTMDBUrl = (movieName) =>
  `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
