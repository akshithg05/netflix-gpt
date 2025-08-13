import { useSelector } from "react-redux";
import SuggestedMovieCard from "./SuggestedMovieCard";
import lang from "../utils/languageConstants";
import { NO_RESULTS_FOUND } from "../utils/constants";

export default function GptSearchMovieSuggestions() {
  const tmdbResults = useSelector((state) => state.gpt.tmdbResults);
  const gptMovies = useSelector((state) => state.gpt.gptMovies);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  if (gptMovies?.[0] === NO_RESULTS_FOUND)
    return <p>{lang[currentLanguage].no_keywords_text}</p>;
  if (!tmdbResults || tmdbResults.length === 0) return;
  return (
    <div className="lg:p-4 lg:m-4 overflow-y-auto sm:h-full md:h-96 lg:h-[30rem] no-scrollbar">
      {tmdbResults.map((movie) => (
        <SuggestedMovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
