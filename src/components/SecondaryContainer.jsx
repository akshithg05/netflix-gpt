import { useSelector } from "react-redux";
import MovieList from "./MovieList";

export default function SecondaryContainer() {
  const movies = useSelector((state) => state?.movies);
  return (
    <div className="-mt-90 relative pl-12">
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} />
      <MovieList title={"Popular"} movies={movies?.popularMovies} />
      <MovieList title={"Upcoming"} movies={movies?.upComingMovies} />
      <MovieList title={"Horror"} movies={movies?.horrorMovies} />
      <MovieList title={"Action"} movies={movies?.actionMovies} />
    </div>
  );
}
