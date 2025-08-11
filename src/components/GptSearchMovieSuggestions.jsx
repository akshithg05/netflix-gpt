import { useSelector } from "react-redux";

export default function GptSearchMovieSuggestions() {
  const tmdbResults = useSelector((state) => state.gpt.tmdbResults);
  if (!tmdbResults || tmdbResults.length === 0) return null;

  return <div className="p-4 m-4"></div>;
}
