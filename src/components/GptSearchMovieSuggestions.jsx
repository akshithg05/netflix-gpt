import { useSelector } from "react-redux";
import SuggestedMovieCard from "./SuggestedMovieCard";
import lang from "../utils/languageConstants";

export default function GptSearchMovieSuggestions() {
  const tmdbResults = useSelector((state) => state.gpt.tmdbResults);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  if (!tmdbResults || tmdbResults.length === 0)
    return <p>{lang[currentLanguage].no_keywords_text}</p>;

  return (
    <div className="lg:p-4 lg:m-4 overflow-y-auto sm:h-full md:h-96 lg:h-[30rem] no-scrollbar">
      {tmdbResults.map((movie) => (
        <SuggestedMovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
