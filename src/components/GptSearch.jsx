import GptSearchBar from "./GptSearchBar";
import GptSearchMovieSuggestions from "./GptSearchMovieSuggestions";
import { BACKGROUND_IMAGE } from "../utils/constants";

export default function GptSearch() {
  return (
    <div>
      <div className="absolute -z-10 ">
        <img src={BACKGROUND_IMAGE} alt="bg-image" className="max-w-none" />
      </div>
      <GptSearchBar />
      <GptSearchMovieSuggestions />
    </div>
  );
}
