import { useSelector } from "react-redux";
import SuggestedMovieCard from "./SuggestedMovieCard";

export default function GptSearchMovieSuggestions() {
  const tmdbResults = useSelector((state) => state.gpt.tmdbResults);
  if (!tmdbResults || tmdbResults.length === 0) return null;

  return (
    <div className="lg:p-4 lg:m-4 overflow-y-auto sm:h-full md:h-96 lg:h-[30rem] no-scrollbar">
      {tmdbResults.map((movie) => (
        <SuggestedMovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
