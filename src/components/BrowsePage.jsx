import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";

export default function BrowsePage() {
  const nowPlayingMovies = useNowPlayingMovies();

  console.log(nowPlayingMovies);

  return (
    <div>
      <Header />
      {/*
      - MovieContainer
        - VideoBackground
        - VideoTitle
      - SecondaryContainer
        - Movielist * n
          - MovieCard * n
       */}
    </div>
  );
}
