import GptSearchBar from "./GptSearchBar";
import GptSearchMovieSuggestions from "./GptSearchMovieSuggestions";
import { BACKGROUND_IMAGE } from "../utils/constants";
import { useState } from "react";

export default function GptSearch() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <div className="absolute -z-10 ">
        <img src={BACKGROUND_IMAGE} alt="bg-image" className="max-w-none" />
      </div>
      <GptSearchBar isLoading={isLoading} setIsLoading={setIsLoading} />
      {isLoading ? (
        <div className="w-full max-w-4xl  md:grid-cols-12 bg-black p-4  mx-auto text-center">
          <p>Searching for movies...</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl  md:grid-cols-12 bg-black p-4  mx-auto text-center rounded-b-lg">
          <GptSearchMovieSuggestions />
        </div>
      )}
    </div>
  );
}
