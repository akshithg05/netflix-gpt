import { useSelector } from "react-redux";
import MovieList from "./MovieList";

export default function SecondaryContainer() {
  const movies = useSelector((state) => state?.movies);
  return (
    <div>
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Trending"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Upcoming"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Horror"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
    </div>
  );
}
