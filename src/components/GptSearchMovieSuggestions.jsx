import { useSelector } from "react-redux";
import SuggestedMovieCard from "./SuggestedMovieCard";

export default function GptSearchMovieSuggestions() {
  const tmdbResults = useSelector((state) => state.gpt.tmdbResults);
  if (!tmdbResults || tmdbResults.length === 0) return null;

  return (
    <div className="p-4 m-4 h-64 overflow-y-auto md:h-96 lg:h-[32rem] no-scrollbar">
      {tmdbResults.map((movie) => (
        <SuggestedMovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
