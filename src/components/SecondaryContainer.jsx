import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import lang from "../utils/languageConstants";

export default function SecondaryContainer() {
  const movies = useSelector((state) => state?.movies);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  return (
    <div className="bg-black">
      <div
        className="
    mt-0 sm:-mt-10 md:-mt-20 [@media(min-width:1000px)]:-mt-115
    px-4 sm:px-8 md:px-12
    relative z-20
  "
      >
        <MovieList
          title={lang[currentLanguage].now_playing}
          movies={movies?.nowPlayingMovies}
        />
        <MovieList
          title={lang[currentLanguage].top_rated}
          movies={movies?.topRatedMovies}
        />
        <MovieList
          title={lang[currentLanguage].popular}
          movies={movies?.popularMovies}
        />
        <MovieList
          title={lang[currentLanguage].upcoming}
          movies={movies?.upComingMovies}
        />
        <MovieList
          title={lang[currentLanguage].horror}
          movies={movies?.horrorMovies}
        />
        <MovieList
          title={lang[currentLanguage].action}
          movies={movies?.actionMovies}
        />
      </div>
    </div>
  );
}
