import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import useActionMovies from "../hooks/useActionMovies";
import useHorrorMovies from "../hooks/useHorrorMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

export default function BrowsePage() {
  // Setting all our movies to the store
  const nowPlayingMovies = useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  useActionMovies();
  useHorrorMovies();

  return (
    <div>
      <Header />

      <MainContainer nowPlayingMovies={nowPlayingMovies} />
      <SecondaryContainer />
    </div>
  );
}
