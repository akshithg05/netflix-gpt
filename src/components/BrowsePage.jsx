import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

export default function BrowsePage() {
  const nowPlayingMovies = useNowPlayingMovies();

  return (
    <div>
      <Header />

      <MainContainer nowPlayingMovies={nowPlayingMovies} />
      <SecondaryContainer />
    </div>
  );
}
