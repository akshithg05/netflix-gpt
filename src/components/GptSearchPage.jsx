import GptSearchBar from "./GptSearchBar";
import GptSearchMovieSuggestions from "./GptSearchMovieSuggestions";
import { BACKGROUND_IMAGE } from "../utils/constants";
import { useState } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

export default function GptSearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  return (
    <div className="w-full min-h-screen pt-20">
      <div className="absolute inset-0 -z-10">
        <img
          src={BACKGROUND_IMAGE}
          alt="bg-image"
          className="min-w-screen min-h-screen max-w-screen object-cover"
        />
      </div>
      <GptSearchBar setIsLoading={setIsLoading} setClear={setClear} />
      {isLoading ? (
        <div className="w-full max-w-4xl md:grid-cols-12 bg-black p-4 mx-auto text-center">
          <p>{lang[currentLanguage]?.searching}</p>
        </div>
      ) : !isLoading && !clear ? (
        <div className="w-full max-w-4xl md:grid-cols-12 bg-black p-4 mx-auto text-center rounded-b-lg">
          <GptSearchMovieSuggestions />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
